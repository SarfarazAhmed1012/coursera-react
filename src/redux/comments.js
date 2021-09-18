import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading: false, errMess: null, comments: action.payload};
        
        case ActionTypes.COMMENTS_FAILED:
                return {...state, isLoading: false, errMess: action.payload, comments: []};

        case ActionTypes.ADD_COMMENTS:
            var comment = action.payload;
            comment.id = state.comment.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return {...state, comments: state.comments.concat(comment)};

        default:
          return state;
      }
};
// payload was the JS Object which contain the various parts of the comments.
// here we will add comment in the set of the comments, and return its value