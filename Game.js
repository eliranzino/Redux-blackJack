import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Action } from '../Action/Action';


class _Game extends React.Component {
    render() {
        const { playerScore, dealerScore } = this.props;
        if(playerScore===21){
        return <div>PLAYER WIN, HE GOT {playerScore}</div>
        }else if(dealerScore===21){
        return <div>DEALER WIN WITH {dealerScore}</div>
        }else if (playerScore>21){
        return <div>DEALER WIN because player got {playerScore} total</div>
        }else if(dealerScore>21){
            return <div>PLAYER WIN because dealer got {dealerScore} total</div>
        }else if(dealerScore>=17){
            return <div>GAME OVER, dealer with {dealerScore} points and player with {playerScore} points</div>
        }

        return (
            <div>
                <h1>Black Jack!♣♠</h1>
               <div>Player Score: {playerScore}</div>
               <div>Dealer Score: {dealerScore}</div>
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
        isDealerActive:state.isDealerActive
    };
}

export const Game = connect(mapStateToProps, mapDispatchToProps)(_Game);