import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Action } from '../Action/Action';


class _Game extends React.Component {
    render() {
        let message = "";
        const { playerScore, dealerScore, winner, playerCards, dealerCards } = this.props;
        console.log(playerCards, dealerCards)


        if(playerScore===21){
        message= <div>PLAYER WIN, HE GOT {playerScore}</div>
        }else if(dealerScore===21){
        message= <div>DEALER WIN WITH {dealerScore}</div>
        }else if (playerScore>21){
        message= <div>DEALER WIN because player got {playerScore} total</div>
        }else if(dealerScore>21){
        message= <div>PLAYER WIN because dealer got {dealerScore} total</div>
        }else if(dealerScore>=17){
        message= <div>GAME OVER, dealer with {dealerScore} points and player with {playerScore} points</div>
        }

        return (
            <div>
                <div>{message}</div>
                <h1>Black Jack!♣♠</h1>
               <div>Player Score: {playerScore}</div>
               <div>Dealer Score: {dealerScore}</div>
               <div>And the winner is: {winner} </div>
               <Action/>
            </div>
        )
    }
}
const mapDispatchToProps = {
    stand: () => ({
        type: 'INCREASE_DEALER_POINTS',
    }),
}

const mapStateToProps = (state) => {
    return {
        playerScore: state.playerScore,
        dealerScore: state.dealerScore,
        isDealerActive:state.isDealerActive,
        winner:state.winner,
        playerCards: state.playerCards,
        dealerCards: state.dealerCards,
    };
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);