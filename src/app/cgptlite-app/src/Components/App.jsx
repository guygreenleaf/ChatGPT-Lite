import { useState } from 'react';
import OpenAIContext from '../OpenAIContext/OpenAIContext';
import Response from './Response';
import Request from './Request';
import '../styles/App.css';
import ConfigPane from './ConfigPane';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [configPane, setConfigPane] = useState(false);

  let aiContext = new OpenAIContext();

  let submitPrompt = async() =>{
    try{
        setHasPrompted(true);
        setIsLoading(true);
        let res = await aiContext.SubmitPrompt(prompt);
        setResponse(res);
    }catch(e){
      setResponse("Error retrieving response. Please check your API Key and Creativity settings in the 'Configure' menu.");
    }finally{
      setIsLoading(false);
    }
  };

  let toggleConfigPane = () => {
    setConfigPane(!configPane);
  };

  return (
    <div>
      <div style={{textAlign:'center'}}>      
        <h1>ChatGPT Lite</h1>
        <p style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => toggleConfigPane()}>
        {configPane ? "Back to Prompt" : "Configure"}
        </p>
      </div>

      {configPane ? (
        <div>
          <ConfigPane />
        </div>) : (
        <div>
        {localStorage.getItem('openAiApiKey') === '' || localStorage.getItem('openAiApiKey') === undefined || localStorage.getItem('openAiApiKey')=== null ? (<div>Please enter an OpenAI API Key via the 'Configure' menu</div>) : 
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
