import {useState} from "preact/hooks";

export default function Dice(){
  const serviceUrl = import.meta.url.replace("index.js", "");
    const [face, setFace] = useState(`${serviceUrl}dice-six-svgrepo-com.svg`)
    const [parentID] = useState(Array.from({ length: 16 }, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16))).join(''));
    return <><img onclick={evt=>{
        const sides = ["dice-one-svgrepo-com.svg", "dice-two-svgrepo-com.svg", "dice-three-svgrepo-com.svg", "dice-four-svgrepo-com.svg",
            "dice-five-svgrepo-com.svg", "dice-six-svgrepo-com.svg"
        ];
        const traceID = Array.from({ length: 32 }, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16))).join('');
        console.log(`traceId = ${traceID}`);
        fetch(`${serviceUrl}rolldice`, {headers:{
            traceparent: `00-${traceID}-${parentID}-00`
        }}).then((res)=>{
            if(res.status >= 500){
                // server error handled here
                res.text().then((sText)=>{
                    alert(`server error ${res.status} ${sText}`);
                })
            }
            res.json().then((oRes)=>{
                setFace(`${serviceUrl}${sides[oRes.side]}`);
            })
        });
    }} src={face} /></>
}