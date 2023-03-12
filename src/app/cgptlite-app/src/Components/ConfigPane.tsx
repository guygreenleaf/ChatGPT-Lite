import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';

function ConfigPane(props:any){
    let [apiKeyInfo, setApiKeyInfo] = useState<string>();
    let [creativityInfo, setCreativityInfo] = useState<string>();
    let [errList, setErrList] = useState(new Array<string>());
    let [successSave, setSuccess] = useState(false);

    useEffect(() => {
        window.addEventListener("message", (event) => {
            let msg = event.data;
            if(msg.type === "getState"){
                setApiKeyInfo(msg.apiKey);
                setCreativityInfo(msg.creativity);
            }
        });
    }, []);

    useEffect(() => {
        props.tsvscode.postMessage({
            type:'getState'
        });
    }, []);

    let isNumeric = (str:any) => {
        return !isNaN(str) && 
               !isNaN(parseFloat(str)); 
    };
    
    let isValidSave = () => {
        let isValid = true;
        setErrList([]);
        if(apiKeyInfo === undefined || apiKeyInfo === null || apiKeyInfo === '' || apiKeyInfo.length === 0){
            setErrList((errList) => [...errList, 'Please provide an API Key']);
            isValid = false;
        }
        if(!isNumeric(creativityInfo) || Number(creativityInfo) < 0.1 || Number(creativityInfo) > 2){
            setErrList((errList) => [...errList, 'Please provide a valid Creativity value between 0.1 and 2']);
            isValid = false;
        }
        return isValid;
    };

    let updateState = async () => {
        try
        {
            setSuccess(false);
            if(isValidSave()){
                props.tsvscode.postMessage({
                    type:'setState',
                    apiKey:apiKeyInfo,
                    creativity:creativityInfo
                });
                setSuccess(true);
            }   
        }
        catch(e)
        {
            console.log(e);
        }
    };

    return (
    <div> 
    {(errList.length > 0) ? (
        <div>
            <ul>
                {errList.map((e) =>
                    <li style={{color:'red'}}>{e}</li>
                )}
            </ul>
        </div>
    ) 
    : (<></>)}

    {successSave === true ? (
        <div style={{marginBottom:'1rem'}}>
            <span style={{color:'white'}}>Configuration Saved!</span>
        </div>
    ) 
    : (<></>)}


    <div style={{marginBottom:"1rem", display:'flex', flexDirection:'row', alignItems:'center'}}>
        <label style={{marginRight:"1.6rem", minWidth:'45px'}} htmlFor="apiKey">API Key</label>
        <input id="apiKey" type='text' value={apiKeyInfo} onChange={(e) => setApiKeyInfo(e.target.value)} data-tooltip-id="apiKeyTooltip" data-tooltip-content="Stored locally in memory"></input>
    </div>
    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
        <label style={{marginRight:"1rem"}} htmlFor="creativity">Creativity</label>
        <input id="creativity" type='text' data-tooltip-id="creativityTooltip" data-tooltip-content="0.1 - 2 with 2 being the most 'creative'" value={creativityInfo} onChange={(e) =>  setCreativityInfo(e.target.value)}></input>
    </div>
    <Tooltip id="creativityTooltip" />
    <Tooltip id="apiKeyTooltip" />
    <button type='submit' style={{marginTop:'20px'}} onClick={updateState} >Save</button>

    </div>);
}

export default ConfigPane;