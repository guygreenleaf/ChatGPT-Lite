import { useState } from 'react';
import OpenAIContext from '../OpenAIContext/OpenAIContext';
import Response from './Response';
import Request from './Request';
import '../styles/App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  let aiContext = new OpenAIContext();

  let submitPrompt = async() =>{
    try{
      setHasPrompted(true);
      setIsLoading(true);
      let res = await aiContext.SubmitPrompt(prompt);
      setResponse(res);
    }catch(e){
      console.log(e);
      setResponse("Error retrieving response.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>      
        <h1>ChatGPT Lite</h1>
      </div>
      <div>
        <Request setPrompt={setPrompt} prompt={prompt} submitPrompt={submitPrompt} />
      </div>
      <div>
        {!hasPrompted 
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
