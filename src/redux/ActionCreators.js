import * as ActionTypes from './ActionTypes';

// ACTION //
// this action will return a plain JS object
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT, // this action type is being imported from Action Types, //  and all the actions like ADD_COMMENT can be used here
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
}); // Now we will send this action to the store, and we know it should be affecting the comments part of the state. 
    // 