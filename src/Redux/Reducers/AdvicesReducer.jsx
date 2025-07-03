import {
  CREATE_ADVICES_RED,
  DELETE_ADVICES_RED,
  GET_ADVICES_RED,
  UPDATE_ADVICES_RED,
} from "../Constants";

export default function AdvicesReducer(state=[], action) {
  switch (action.type) {
    case CREATE_ADVICES_RED:
      return [...state, action.payload];

    case GET_ADVICES_RED:
      return action.payload;

    case UPDATE_ADVICES_RED:
      let index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name; 
      state[index].email = action.payload.email;
      state[index].rating = action.payload.rating; 
      state[index].comments = action.payload.comments; 
      return state;

    case DELETE_ADVICES_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
