import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');

  let submitPrompt = () =>{
    console.log(prompt);
  };

  return (
    <div>
      <h1>ChatGPT Lite</h1>
      <div>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={submitPrompt}>
          Submit Prompt
        </button>
      </div>
    </div>
  );
}

export default App;
