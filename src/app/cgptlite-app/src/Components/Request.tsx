import '../styles/Common.css';

export interface Props{
  prompt:string;
  setPrompt:Function;
  submitPrompt:Function;
}

export function Request(props:Props){
    return (
      <div className="flexCenter">
        <div>        
          <textarea placeholder='Enter a Prompt' className='mVH' value={props.prompt} onChange={(e) => props.setPrompt(e.target.value)} />
        </div>
        <div>        
          <button onClick={() => props.submitPrompt()}>
              Submit Prompt
            </button>
        </div>
      </div>
    );
}

export default Request;