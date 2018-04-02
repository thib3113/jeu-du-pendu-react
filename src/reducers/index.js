import uuidV1 from "uuid/v1";
import {
    CREATE_USER, DELETE_USER,
    GET_WORDS_LOADING, GET_WORDS_LOADING_END, GET_WORDS_LOADING_ERROR, UPDATE_USER
} from "../constants/action-types";

const initialState = {
    words : [],
    errors: [],
    users : [
        {
            name : "user 1",
            uuid : uuidV1(),
            score: 0,
            added:false
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
        case UPDATE_USER:
            let users = state.users.map(user => {
                if (user.uuid === action.user.uuid)
                    return action.user;
                else
                    return user;
            });
            return {...state, users: users};
        case CREATE_USER:
            return {...state, users: [...state.users, {
                    uuid:uuidV1(),
                    name:"user "+(state.users.length+1),
                    score:0,
                    added:true
                }]};
        case DELETE_USER:
            return {...state, users:state.users.filter(user=>user.uuid!==action.user.uuid)};
        default:
            return state;
    }
};

export default RootReducer;