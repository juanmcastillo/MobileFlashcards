import * as ActionTypes from '../../actions/ActionTypes';

const decks = (state = {}, action) => {

    switch (action.type) {
        
        case ActionTypes.GET_DECKS:
            return {
                ...state,
                decks: action.decks ? action.decks.map(d => d) : []
            };

        case ActionTypes.SAVE_DECK:
            return {
                ...state,
                decks: state.decks ? state.decks.concat([action.deck]) : [action.deck]
            };

        case ActionTypes.UPDATE_DECK:
            return {
                ...state,
                decks: state.decks.map(d => d.id === action.deck.id ? action.deck : d)
            };

        default:
            return state;
    }
}

export default decks;
