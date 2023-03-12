import { useEffect, useState } from 'react';
import OpenAIContext from '../OpenAIContext/OpenAIContext';
import Response from './Response';
import Request from './Request';
import '../styles/App.css';
import ConfigPane from './ConfigPane';

//@ts-ignore
let tsvscode = acquireVsCodeApi();

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [configPane, setConfigPane] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [apiKey, setApiKey] = useState<string>();
  const [creativity, setCreativity] = useState<string>();

  useEffect(() => {
    window.addEventListener("message", (event) => {
        let msg = event.data;
        if(msg.type === "isStateful"){
          setIsConfigured(msg.isStateful);
        }
    });

    window.addEventListener("message", (event) => {
      let msg = event.data;
      if(msg.type === "getState"){
          setApiKey(msg.apiKey);
          setCreativity(msg.creativity);
      }
    });

    tsvscode.postMessage({
      type:"isStateful"
    });

    tsvscode.postMessage({
      type:"getState"
    });

  }, []);


  let submitPrompt = async() =>{
    if(prompt !== ''){
      try{
        const aiContext = new OpenAIContext(apiKey as string);
        setHasPrompted(true);
        setIsLoading(true);
        let res = await aiContext.SubmitPrompt(prompt, creativity as string);
        setResponse(res ?? "Error retrieving response. Please check your API Key and Creativity settings in the 'Configure' menu.");  
      }catch(e){
        setResponse("Error retrieving response. Please check your API Key and Creativity settings in the 'Configure' menu.");
      }finally{
        setIsLoading(false);
      }
    }
  };

  let toggleConfigPane = () => {
    setConfigPane(!configPane);
    if(configPane){
      tsvscode.postMessage({
        type:"isStateful"
      });
      tsvscode.postMessage({
        type:"getState"
      });
    }
  };

  return (
    <div>
      <div style={{textAlign:'center'}}>      
        <p style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => toggleConfigPane()}>
        {configPane ? "Back to Prompt" : "Configure"}
        </p>
      </div>

      {configPane ? (
        <div>
          <ConfigPane tsvscode={tsvscode}  />
        </div>) : (
        <div>
        {!isConfigured ? (<div>Please enter an OpenAI API Key via the 'Configure' menu</div>) : 
          (<Request setPrompt={setPrompt} prompt={prompt} submitPrompt={submitPrompt} />)
        }        
        </div>
      )}

      <div>
        {(!hasPrompted) || (configPane) 
          ? 
          (<></>)             
          :
          (<div>{<Response response={response} isLoading={isLoading} />}</div>) 
        }
      </div>
    </div>
  );
}

export default App;
