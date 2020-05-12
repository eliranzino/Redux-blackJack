import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import shuffle from 'lodash.shuffle';

const initialState = {
    pack: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    playerScore: 0,
    dealerScore: 0,
    isDealerActive: false,
}
const repeatedPack = new Array(4).fill(initialState.pack).flat();
const stack = shuffle(repeatedPack);
console.log({ stack })

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREASE_PLAYER_POINTS': {
            const pullCardFromPack = getRandomCard();
            console.log("you took:", pullCardFromPack)
            pullCardFromPack.push(state.playerScore)
            console.log({ pullCardFromPack })
            const sum = pullCardFromPack.reduce(sumofArray);
            console.log({ sum })
            return {
                ...state,
                playerScore: sum,
            }
        }
        case 'STAND': {
            return {
                ...state,
                isDealerActive: true,
            }
        }
        case 'INCREASE_DEALER_POINTS': {
            const pullCardFromPack = getRandomCard();
            pullCardFromPack.push(state.dealerScore);
            const sum = pullCardFromPack.reduce(sumofArray);
            return {
                ...state,
                dealerScore: sum,
            }
        }
        case 'START_GAME': {
            const pullTwoCardsFromPack = getTwoRandomCardS();
            const sum = pullTwoCardsFromPack.reduce(sumofArray);
            const pullOneCardFromPack = getRandomCard();
            const sumOfDealer = pullOneCardFromPack.reduce(sumofArray);

            console.log("for dealer", pullOneCardFromPack)
            return {
                ...state,
                playerScore: state.playerScore + sum,
                dealerScore: sumOfDealer,
            }
        }
        
        default: {
            return state;
        }
    }
}


function sumofArray(sum, num) {
    return sum + num;
}

const logger = createLogger();
const middleware = composeWithDevTools(applyMiddleware(logger));
const store = createStore(reducer, middleware);

function main() {
    const titleEl = document.createElement('h2');
    titleEl.innerText = 'BlackJack♠♣';
    document.body.append(titleEl)

    const startPlayButton = createButtonStartPlayComponent();
    document.body.append(startPlayButton);

    const buttonHit = createButtonHitComponent();
    document.body.append(buttonHit);

    const buttonStand = createButtonStandComponent();
    document.body.append(buttonStand);

    const valuePlayerScoreEl = createPlayerScoreValueComponent();
    document.body.append(valuePlayerScoreEl);

    const valueDealerScoreEl = createDealerScoreValueComponent();
    document.body.append(valueDealerScoreEl);
}
main();

store.subscribe(() => {
    console.log("subscribe")
    const { isDealerActive } = store.getState();
    if (isDealerActive) {
        const { dealerScore } = store.getState();
        while (dealerScore < 17) {
            store.dispatch({
                type: 'INCREASE_DEALER_POINTS',
                payload: {},
            });
        }
    }
});






function getRandomCard() {
    const pullFromPack = stack.splice(0, 1);
    return pullFromPack;
}
function getTwoRandomCardS() {
    const pullFromPack = stack.splice(0, 2)
    return pullFromPack;
}

function createPlayerScoreValueComponent() {
    const valueEl = document.createElement('div');
    const { playerScore } = store.getState();
    valueEl.innerHTML = playerScore;

    store.subscribe(() => {
        const { playerScore } = store.getState();
        valueEl.innerHTML = (`<p>Player score: ${playerScore}<p>`);
    });
    return valueEl;
}

function createDealerScoreValueComponent() {
    const valueEl = document.createElement('div');
    const { dealerScore } = store.getState();
    valueEl.innerHTML = dealerScore;

    store.subscribe(() => {
        const { dealerScore } = store.getState();
        valueEl.innerHTML = (`<p>Dealer score: ${dealerScore}<p>`);
    });
    return valueEl;
}

function createButtonHitComponent() {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = 'HIT';
    buttonEl.addEventListener('click', () => {
        const randomCard = repeatedPack[Math.floor(Math.random() * repeatedPack.length)];
        document.body.append(`the next card is: ${randomCard} `)
        store.dispatch({
            type: 'INCREASE_PLAYER_POINTS',
            payload: {},
        });
    });
    return buttonEl;
}

function createButtonStartPlayComponent() {
    const buttonStartEl = document.createElement('button');
    buttonStartEl.innerHTML = 'START PLAY';
    buttonStartEl.addEventListener('click', () => {
        store.dispatch({
            type: 'START_GAME',
            payload: {},
        });
    });
    return buttonStartEl;
}

function createButtonStandComponent() {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = 'STAND';
    buttonEl.addEventListener('click', () => {
        console.log("standdd")
        store.dispatch({
            type: 'INCREASE_DEALER_POINTS',
            payload: {},
        });
        console.log("standdd")
        const { isDealerActive } = store.getState();
        if (isDealerActive) {

        }
    });
    return buttonEl;
}


store.subscribe(() => {
    console.log("subscribe")
    const { isDealerActive, dealerScore } = store.getState();
    if (isDealerActive) {
        if (dealerScore < 17) {
            store.dispatch({
                type: 'INCREASE_DEALER_POINTS',
                payload: {},
            });
        } else {
            console.log("thats it, its more than 17", dealerScore);
            return;
        }
    }
});





export function createReduxStore() {
    const logger = createLogger();
    const middleware = composeWithDevTools(applyMiddleware(logger));
    return createStore(reducer, middleware);
}

