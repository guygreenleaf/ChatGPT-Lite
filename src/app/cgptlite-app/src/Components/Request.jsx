import '../styles/Common.css';

function Request(props){
    return (
        <div className="flexCenter">
        <div>        
          <textarea className='mVH' value={props.prompt} onChange={(e) => props.setPrompt(e.target.value)} />
        </div>
        <div>        
          <button onClick={props.submitPrompt}>
              Submit Prompt
            </button>
        </div>
      </div>
    );
}

export default Request;