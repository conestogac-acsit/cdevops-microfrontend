import {useState} from "preact/hooks";

export default function Dice(){
  const serviceUrl = import.meta.url.replace("index.js", "");
    const [face, setFace] = useState(`${serviceUrl}dice-six-svgrepo-com.svg`)
    return <><img onclick={evt=>{
        const sides = ["dice-one-svgrepo-com.svg", "dice-two-svgrepo-com.svg", "dice-three-svgrepo-com.svg", "dice-four-svgrepo-com.svg",
            "dice-five-svgrepo-com.svg", "dice-six-svgrepo-com.svg"
        ];
        fetch(`${serviceUrl}rolldice`, {headers:{
            traceparent: "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-00"
        }}).then((res)=>{
            res.json().then((oRes)=>{
                setFace(`${serviceUrl}${sides[oRes.side]}`);
            })
        });
    }} src={face} /></>
}