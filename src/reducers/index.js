import {GET_WORDS_LOADING, GET_WORDS_LOADING_END, GET_WORDS_LOADING_ERROR} from "../constants/action-types";
import uuidV1                                                              from "uuid/v1";

const initialState = {
    words : [],
    errors: [],
    users : [
        {
            name: "user 1",
            id  : uuidV1(),
            score : 0
        }
    ]
};

const RootReducer = (state = initialState, action) => {
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

export default RootReducer;