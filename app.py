import uvicorn
from fastapi import FastAPI
from fastapi import HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry import trace
from opentelemetry.trace.status import Status, StatusCode
from random import randrange, random
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info(f"{__name__} started") # this will have the version in it


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/exception")
async def exception():
    try:
        raise ValueError("sadness")
    except Exception as ex:
        logger.error(f"Exception: {ex.args}", exc_info=True)
        span = trace.get_current_span()

        # generate random number
        seconds = random.uniform(0, 30)

        # record_exception converts the exception into a span event. 
        exception = IOError("Failed at " + str(seconds))
        span.record_exception(exception)
        span.set_attributes({'est': True})
        # Update the span status to failed.
        span.set_status(Status(StatusCode.ERROR, "internal error"))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Got sadness")



@app.get("/rolldice")
async def rolldice():
   return {
      "side": getRandomSide()      
      }

def getRandomSide():
    return randrange(6)

app.mount('/', StaticFiles(directory="./dist", html=True), name="src")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)