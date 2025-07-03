import {
  CREATE_FEEDBACK_RED,
  DELETE_FEEDBACK_RED,
  GET_FEEDBACK_RED,
  UPDATE_FEEDBACK_RED,
} from "../Constants";

export default function FeedbackReducer(state=[], action) {
  switch (action.type) {
    case CREATE_FEEDBACK_RED:
      return [...state, action.payload];

    case GET_FEEDBACK_RED:
      return action.payload;

    case UPDATE_FEEDBACK_RED:
      let index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name; 
      state[index].email = action.payload.email;
      state[index].rating = action.payload.rating; 
      state[index].comments = action.payload.comments; 
      return state;

    case DELETE_FEEDBACK_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
