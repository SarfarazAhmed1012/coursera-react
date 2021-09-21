import * as ActionTypes from './ActionTypes';
import { baseUrl  } from '../shared/baseUrl'; // for communicating with the Servers

// ACTION //
// this action will return a plain JS object
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT, // this action type is being imported from Action Types, //  and all the actions like ADD_COMMENT can be used here
    payload: comment
}); // Now we will send this action to the store, and we know it should be affecting the comments part of the state. 

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', { // For doing post methods
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok){
                return response;
            }
            else{ // handling error here
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, // incase if server dont reponds 
        error => {
            var errmess = new Error(error.message);
            throw errmess; // this var 'errmess' is would be used in dishesFailed Action below.
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {console.log('Post Comments', error.message);
                alert('your comment could not be posted\n Error: ' + error.message); })

}

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    }
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {

            if (response.ok) {

                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            ////if no responmse from server 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(response => alert(JSON.stringify(response)))
        .catch(error => {
            console.log('Post Feedbacks', error.message);
            alert('Feedback could not be posted\nError' + error.message);
        });

}
    


export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACKS, // this action type is being imported from Action Types, //  and all the actions like ADD_Feedback can be used here
    payload: feedback
});



// FOR DISHES  
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));


    // this was placed originally in order to simulate the communicating with the server.
    // in place of this we will use actual fetch to communicate.
    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000);

    return fetch(baseUrl + 'dishes') // we know dishes are accessible at localhost:3001
        .then(response => {
            if (response.ok){
                return response;
            }
            else{ // handling error here
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }, // incase if server dont reponds 
        error => {
            var errmess = new Error(error.message);
            throw errmess; // this var 'errmess' is would be used in dishesFailed Action below.
        }
        )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        // if in case we throw an error from above two places and incase if a promise has been rejected
        // it will not go to above 2 then functions, so here we will catch error below uusing catch function
        .catch(error => dispatch(dishesFailed(error.message)));

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


// FOR COMMENTS
export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments') // we know comments are accessible at localhost:3001
    .then(response => {
        if (response.ok){
            return response;
        }
        else{ // handling error here
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, // incase if server dont reponds 
    error => {
        var errmess = new Error(error.message);
        throw errmess; // this var 'errmess' is would be used in dishesFailed Action below.
    })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// FOR PROMOS

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions') // we know promos are accessible at localhost:3001
    .then(response => {
        if (response.ok){
            return response;
        }
        else{ // handling error here
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, // incase if server dont reponds 
    error => {
        var errmess = new Error(error.message);
        throw errmess; // this var 'errmess' is would be used in dishesFailed Action below.
    }
    )
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));

}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// FOR LEADERS

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders') // we know promos are accessible at localhost:3001
    .then(response => {
        if (response.ok){
            return response;
        }
        else{ // handling error here
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, // incase if server dont reponds 
    error => {
        var errmess = new Error(error.message);
        throw errmess; // this var 'errmess' is would be used in dishesFailed Action below.
    }
    )
        .then(response => response.json())
        .then(promos => dispatch(addLeaders(promos)))
        .catch(error => dispatch(leadersFailed(error.message)));

}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});