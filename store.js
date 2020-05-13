import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import shuffle from 'lodash.shuffle';

const cardsArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
const repeatedPack = new Array(4).fill(cardsArray).flat();
const stack = shuffle(repeatedPack);

const initialState = {
    pack: stack,
    playerScore: 0,
    playerCards: [],
    dealerScore: 0,
    dealerCards: [],
    winner: null
}
console.log(initialState)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_PLAYER_POINTS': {
            const { card } = action.payload;
            const { playerScore, playerCards } = state;
            const countSum = card + playerScore;
            const modifiedCrds = playerCards.slice();

            modifiedCrds.push(card);

            if (countSum === 21) {
                return {
                    ...state,
                    playerScore: countSum,
                    playerCards: modifiedCrds,
                    winner: "Player",
                };
            }
            if (countSum > 21) {
                return {
                    ...state,
                    playerScore: countSum,
                    playerCards: modifiedCrds,
                    winner: "Dealer",
                };
            }
            return {
                ...state,
                playerScore: countSum,
                playerCards: modifiedCrds,
            }
        }
        case 'UPDATE_DEALER_COUNT': {
            const { card } = action.payload;
            const { dealerScore, dealerCards } = state;
            const countSum = card + dealerScore;
            const modifiedCrds = dealerCards.slice();

            modifiedCrds.push(card);

            if (countSum === 21) {
                return {
                    ...state,
                    dealerScore: countSum,
                    dealerCards: modifiedCrds,
                    winner: "Dealer",
                };
            }
            if (countSum > 21) {
                return {
                    ...state,
                    dealerScore: countSum,
                    dealerCards: modifiedCrds,
                    winner: "player",
                };
            }
            
            return {
                ...state,
                dealerScore: countSum,
                dealerCards: modifiedCrds,
            }
        }
        case 'UPDATE_STACK': {
            const { stack } = action.payload;
            return {
                ...state,
                pack: stack,
            }
        }
        case 'CONCLUDE_GAME': {
            return {
                ...state,
                winner: state.resolveGame,
            }
        }
        default: {
            return state;
        }
    }
}

export function createReduxStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(logger));
    return createStore(reducer, middleware);
}

