import * as requester from '../../../service/requester'
import { useNavigate } from 'react-router-dom';

export default function DisplayEventStartCheck (props) {
    let navigate = useNavigate()
    const onClick= (e)=>{
        requester.post(`http://127.0.0.1:5000/event?token=${props.token}`, { "": "" }).then((res) => {
                props.setRes(res);
                navigate(`?token=${props.token}`)
            });
    }

    return (<>
    <p>{props.massage}</p>
    <button onClick={onClick}>START</button>
    </>)
}