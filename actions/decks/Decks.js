import _ from 'lodash';
import ShortId from 'shortid';
import * as DecksApi from '../../utils/DecksApi';
import * as ActionTypes from '../ActionTypes';

export const getDecks = (decks) => ({
    type: ActionTypes.GET_DECKS,
    decks
})

export const dispatchGetDecks = (dispatch) => (
    DecksApi.getDecks()
            .then(decks => dispatch(getDecks(_.values(JSON.parse(decks)))))
)

export const saveDeck = (deck) => ({
    type: ActionTypes.SAVE_DECK,
    deck
})

export const dispatchSaveDeck = (deck) => (dispatch) => {
    const newDeck = {
        id: ShortId.generate(),
        ...deck
    };

    DecksApi.saveDeck(newDeck);

    return dispatch(saveDeck(newDeck));
}


export const updateDeck = (deck) => ({
    type: ActionTypes.UPDATE_DECK,
    deck
})

export const dispatchUpdateDeck = (deck) => (dispatch) => {
    
    DecksApi.saveDeck(deck);

    return dispatch(updateDeck(deck));
}

  

