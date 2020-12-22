import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Game.css'

export default function (props) {


    const [rounds, setRounds] = useState(24);
    const[userScore, setUserScore] = useState(0);
    const[pcScore,setPcScore] = useState(0);
    const [userDeck, setUserDeck] = useState([{image: 'https://static.impression.co.uk/2014/05/loading1.gif'}]);
    const [pcDeck, setPcDeck] = useState([{image: 'https://static.impression.co.uk/2014/05/loading1.gif'}]);
    const [deckIndex, setDeckIndex] = useState(0)


    useEffect(()=>{
        if (props.deck.success){
            let allCards = [...props.deck.cards];
            setUserDeck(allCards.splice(0,25));
            setPcDeck(allCards);
        }
    },[])
    console.log(userDeck);
    console.log(pcDeck);
 

    const finishRound = ()=>{
        let newUserDeck=userDeck;
        let newPcDeck =pcDeck;
        if(rounds > 0){
            let userValue, pcValue;
            switch(pcDeck[deckIndex].value){
                case 'ACE': 
                pcValue = 14;
                break;
                case 'KING':
                    pcValue = 13;
                    break;
                    case 'QUEEN':
                        pcValue = 12;
                        break;
                        case 'JACK':
                            pcValue = 11;
                            break;
                            default:
                                pcValue = parseInt(pcDeck[deckIndex].value)
            }
            switch(userDeck[deckIndex].value){
                case 'ACE': 
                userValue = 14;
                break;
                case 'KING':
                    userValue = 13;
                    break;
                    case 'QUEEN':
                        userValue = 12;
                        break;
                        case 'JACK':
                            userValue = 11;
                            break;
                            default:
                                userValue = parseInt(userDeck[deckIndex].value)
            }

            if(pcValue > userValue){
                setPcScore(pcScore+1);
            }else if (pcValue < userValue){
                setUserScore(userScore+1);
            }
            setRounds(rounds-1);
            /*newUserDeck.shift();
            setUserDeck(newUserDeck);
            newPcDeck.shift();
            setPcDeck(newPcDeck);*/
            if(deckIndex !== userDeck.length-1){
                setDeckIndex(deckIndex+1)
            }
        }
        else{
            if(userScore>pcScore){
                props.updateStats(true);
            }else{
                props.updateStats(false);
            }
        }
    }


    return (
        <div>
            <div className='gameDiv'>
            <div className='row'>
                <div className='col-md-6'>
                    <h1>Computer: {pcScore} points</h1><br />
                    {rounds < 0 ? 'dd' : <img src={pcDeck[deckIndex].image} />}
                </div>
                <div className='col-md-6'>
                    <h1>You: {userScore} points</h1><br />
                    {rounds < 0 ? 'dd' : <img src={userDeck[deckIndex].image} />}
                </div>
            </div>
            <p>cards remaining {rounds}</p>
            <Link to={rounds===0 && '/finish'}><button className='btn btn-primary btn-lg' onClick={finishRound}>Next</button></Link>
            </div>
        </div>
    )
}