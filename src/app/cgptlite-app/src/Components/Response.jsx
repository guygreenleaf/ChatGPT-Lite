import '../styles/Common.css';

function Response(props){
    return (
        <div className='flexCenter'>
            <div>
                <h4>Response</h4>
            </div>
            <div>
                {props.isLoading ? (<div class="loader"></div>) : (<textarea className='mVH' value={props.response}/>)}
            </div>
        </div>
    );
}

export default Response;