import '../styles/Common.css';

export interface Props{
    isLoading:boolean;
    response:string;
}

function Response(props:Props){
    return (
        <div className='flexCenter'>
            <div>
                <h4>Response</h4>
            </div>
            <div>
                {props.isLoading ? (<div className="loader"></div>) : (<textarea className='mVH' value={props.response}/>)}
            </div>
        </div>
    );
}

export default Response;