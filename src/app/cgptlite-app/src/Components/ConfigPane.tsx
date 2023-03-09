
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { useState } from 'react';

function ConfigPane(){
    let [apiKeyInfo, setApiKeyInfo] = useState( localStorage.getItem('openAiApiKey') === null ? "" : localStorage.getItem('openAiApiKey'));
    let [creativityInfo, setCreativityInfo] = useState(localStorage.getItem('modelCreativity') === null ? 0.4 : localStorage.getItem('modelCreativity') );
    let [errList, setErrList] = useState(new Array<string>());
    let [successSave, setSuccess] = useState(false);

    let isValidSave = () => {
        let isValid = true;
        setErrList([]);
        console.log(errList);
        if(apiKeyInfo === undefined || apiKeyInfo === null || apiKeyInfo === '' || apiKeyInfo.length === 0){
            setErrList((errList) => [...errList, 'Please provide an API Key']);
            isValid = false;
        }
        if(Number(creativityInfo) < 0.1 || Number(creativityInfo) > 2){
            setErrList((errList) => [...errList, 'Please provide a Creativity value between 0.1 and 2']);
            isValid = false;
        }
        return isValid;
    };

    let updateState = () => {
        try{
            setSuccess(false);
            if(isValidSave() && apiKeyInfo !== null && creativityInfo !== null){
                localStorage.setItem('openAiApiKey', apiKeyInfo);
                localStorage.setItem('modelCreativity', creativityInfo.toString());
                setSuccess(true);
            }
        } catch (e){
                setErrList(errList => [...errList, (e as Error).message]);
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
            <span style={{color:'white'}}>Configuration Saved</span>
        </div>
    ) 
    : (<></>)}
        <form onSubmit={updateState} onInvalid={(e) => e.preventDefault()} >
            <div style={{marginBottom:"1rem", display:'flex', flexDirection:'row', alignItems:'center'}}>
                <label style={{marginRight:"1.6rem", minWidth:'45px'}} htmlFor="apiKey">API Key</label>
                <input id="apiKey" type='text' value={apiKeyInfo?.toString()} onChange={(e) => setApiKeyInfo(e.target.value)} data-tooltip-id="apiKeyTooltip" data-tooltip-content="Stored locally in memory"></input>
            </div>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <label style={{marginRight:"1rem"}} htmlFor="apiKey" >Creativity</label>
                <input id="apiKey" type='number' min='0.1' max='2' data-tooltip-id="creativityTooltip" data-tooltip-content="0.1 - 2 with 2 being the most 'creative'" value={creativityInfo?.toString()} onChange={(e) =>  setCreativityInfo(e.target.value)}></input>
            </div>
            <Tooltip id="creativityTooltip" />
            <Tooltip id="apiKeyTooltip" />
            <button type='submit' style={{marginTop:'20px'}} onClick={updateState}>Save</button>
        </form>
    </div>);
}

export default ConfigPane;