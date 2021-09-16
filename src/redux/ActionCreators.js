import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

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
    
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});