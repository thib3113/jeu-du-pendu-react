import {GET_WORDS_LOADING, GET_WORDS_LOADING_END, GET_WORDS_LOADING_ERROR} from "../constants/action-types";

let initialState = {
    words : [],
    errors: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WORDS_LOADING:
            return {...state, loading: true, errors: []};
        case GET_WORDS_LOADING_END:
            return {...state, loading: false, words: [...action.words]};
        case GET_WORDS_LOADING_ERROR:
            return {...state, errors: [...action.errors, action.errors]};
        default:
            return state;
    }
};