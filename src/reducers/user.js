import uuidV1 from "uuid/v1";
import {
    CREATE_USER, DELETE_USER, NEXT_TURN, RESET_SCORE, UPDATE_USER
} from "../constants/action-types";

let initialState = [
    {
        name : "user 1",
        uuid : uuidV1(),
        score: 0,
        added: false,
        hisTurn : true
    }
];

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return state.map(user => {
                if (user.uuid === action.user.uuid)
                    return action.user;
                else
                    return user;
            });
        case CREATE_USER:
            return [
                    ...state, {
                        uuid : uuidV1(),
                        name : "user " + (state.length + 1),
                        score: 0,
                        added: true,
                        hisTurn:false
                    }
                ];
        case DELETE_USER:
            return state.filter(user => user.uuid !== action.user.uuid);

        case NEXT_TURN:
            let index = state.map(function (img) { return img.hisTurn; }).indexOf(true);

            if(++index >= state.length)
                index = 0;

            return state.map((user, i) => {
                let score = action.win? user.score+1 : user.score;
                if (i === index)
                    return {...user, hisTurn:true};
                else if(user.hisTurn)
                    return {...user, hisTurn:false,score};
                else
                    return user;
            });
        case RESET_SCORE:
            return state.map(user => {
               return {...user, score:0}
            });
        default:
            return state;
    }
};

