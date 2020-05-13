import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./Action.css"

class _Action extends React.Component {
    render() {
        return (
            <div>
                <Button onClick={this.startGame}>START GAME</Button>
                <br />
                <Button className="button" onClick={this.onHit}>HIT</Button>
                <Button onClick={this.shouldGameResolve}>STAND</Button>
            </div>
        )
    }
    startGame = () => {
        const { pack, updateStack, updateDealerCount, updatePlayerCount } = this.props;
        const modifiedStack = pack.slice();
        const dealerCard = modifiedStack.pop();
        const playerCard = modifiedStack.pop();
        const playerSecondCard = modifiedStack.pop();
        updateStack({ stack: modifiedStack });
        updateDealerCount({ card: dealerCard });
        updatePlayerCount({ card: playerCard });
        updatePlayerCount({ card: playerSecondCard });
    }

    shouldGameResolve = () => {
        const { dealerScore, resolveGame } = this.props;
        console.log({dealerScore})
        if (dealerScore >= 17 ) {
            console.log({dealerScore})
            resolveGame();
            return;
        }
        this.handleDealerDraw();
    }
    handleDealerDraw = () => {
        const { pack, updateStack, updateDealerCount } = this.props;
        console.log({ pack })
        const modifiedStack = pack.slice();
        const dealerCard = modifiedStack.pop();

        updateStack({ stack: modifiedStack });
        updateDealerCount({ card: dealerCard });

        setTimeout(() => {
            this.shouldGameResolve();
        }, 500)

    }
    onHit=()=>{
        const { pack , updatePlayerCount} = this.props;
        const modifiedStack = pack.slice();
        const playerCard = modifiedStack.pop();
        updatePlayerCount({ card: playerCard });
    }
    
}
const mapDispatchToProps = {
    resolveGame: () => ({
        type: 'CONCLUDE_GAME',
        payload: {}
    }),
    updateStack: (stack) => ({
        type: 'UPDATE_STACK',
        payload: {
            ...stack,
        }
    }),
    updateDealerCount: (card) => ({
        type: 'UPDATE_DEALER_COUNT',
        payload: {
            ...card,
        }
    }),
    updatePlayerCount: (card) => ({
        type: 'INCREASE_PLAYER_POINTS',
        payload: {
            ...card,
        }
    }),
}

const mapStateToProps = (state) => {
    return {
        playerScore: state.playerScore,
        dealerScore: state.dealerScore,
        isDealerActive: state.isDealerActive,
        pack: state.pack
    };
}

export const Action = connect(mapStateToProps, mapDispatchToProps)(_Action);