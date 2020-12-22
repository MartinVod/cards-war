import React from 'react'
import { Link } from 'react-router-dom'

export default function Finish(props) {
    return (
        <div>
            <h2>Statistics: {props.player.fullName}</h2>
            <h3> number of games: {props.player.numberOfGames}</h3>
            <h3> wins: {props.player.wins}</h3>
            <h3> loses: {props.player.loses}</h3>
            <Link to='/game'><button className='btn btn-alert'>play again?</button></Link>
        </div>
    )
}
