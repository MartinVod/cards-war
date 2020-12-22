import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';



export default function LogInWin(props) {

    const [playerName,setPlayerName] = useState('');
    const [goToGame, setGoToGame] = useState('/')

    const updateName = (e)=>{ // check value of name and set link target appropriatly
        setPlayerName(e.target.value);
        if(e.target.value.length > 0){
            setGoToGame('/game');
        }
        else{
            setGoToGame('/');
        }
    }

    return (
        <div className='form-group container'>
        <h3>Welcome {playerName}</h3>
            <input onChange={updateName} value={playerName} type='text' className='form-control' placeholder='Please enter your name' /><br />
            <Link to={goToGame}><button type='submit' className='btn btn-danger' id='start'>Start</button></Link>
        </div>
    )
}
