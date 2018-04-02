import {GET_WORDS_LOADING, GET_WORDS_LOADING_END, GET_WORDS_LOADING_ERROR} from "../constants/action-types";

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch({
                     type: GET_WORDS_LOADING
                 });

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.status+" "+response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => {

                      dispatch({
                                   type: GET_WORDS_LOADING_END,
                                   words: items
                               });
                  }
            )
            .catch((error) => {
                       dispatch({type: GET_WORDS_LOADING_ERROR, errors: error});
                   }
            )
        ;
    };
}