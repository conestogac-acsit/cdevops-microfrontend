# cdevops-microfrontend
fastapi microfrontend with otel instrumentation

TLDR;

```bash
npm install
npm run preview
```

Then in another terminal window:

```bash
pip install -r requirements.txt
bash otel.sh
```

This provides a somewhat trivial custom element `<x-dice />` that can be consumed from anywhere with access to the app.py url by including index.js (as a module) and putting `<x-dice />` in your markup.
