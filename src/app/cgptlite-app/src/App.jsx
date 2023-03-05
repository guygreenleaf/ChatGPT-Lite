import { useState } from 'react';
import OpenAIContext from './OpenAIContext/OpenAIContext';


function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  let aiContext = new OpenAIContext();

  let submitPrompt = async() =>{
    try{
      setIsLoading(true);
      let res = await aiContext.SubmitPrompt(prompt);
      setResponse(res);

    } catch(e){
      console.log(e);
      setResponse("Error retrieving response.");

    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>ChatGPT Lite</h1>
      <div style={{display:'flex', flexDirection:'column',  alignItems:'center'}}>
        <div>        
          <textarea style={{height:'20vh'}} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div>        
          <button onClick={submitPrompt}>
              Submit Prompt
            </button>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column',  alignItems:'center'}}>
        <h4>Response:</h4>
        {isLoading ? (<span>Loading...</span>) : (<span>{response}</span>)}
      </div>
    </div>
  );
}

export default App;
