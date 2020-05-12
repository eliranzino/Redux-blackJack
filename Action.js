import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "./Action.css"

class _Action extends React.Component {
    render() {
        const { hitCard, startGame, stand, isDealerActive } = this.props;
      
        return (
            <div>
                {isDealerActive?<div>dealer turn</div>: null}
                <Button onClick={startGame}>START GAME</Button>
                <br/>
                <Button className="button" onClick={hitCard}>HIT</Button>
                <Button onClick={stand}>STAND</Button>
            </div>
        )
    }
}
const mapDispatchToProps = {
    hitCard: () => ({
        type: 'INCREASE_PLAYER_POINTS',
    }),
    startGame: () => ({
        type: 'START_GAME',
    }),
    stand: () => ({
        type: 'STAND',
    }),
}

const mapStateToProps = (state) => {
    return {
        playerScore: state.playerScore,
        dealerScore: state.dealerScore,
        isDealerActive: state.isDealerActive,
    };
}



export const Action = connect(mapStateToProps, mapDispatchToProps)(_Action);