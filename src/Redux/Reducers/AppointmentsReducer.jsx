import {
  CREATE_APPOINTMENTS_RED,
  DELETE_APPOINTMENTS_RED,
  GET_APPOINTMENTS_RED,
  UPDATE_APPOINTMENTS_RED,
} from "../Constants";

export default function AppointmentsReducer(state=[], action) {
  switch (action.type) {
    case CREATE_APPOINTMENTS_RED:
      return [...state, action.payload];

    case GET_APPOINTMENTS_RED:
      return action.payload;

    case UPDATE_APPOINTMENTS_RED:
      let index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name; 
      state[index].email = action.payload.email;
      state[index].rating = action.payload.rating; 
      state[index].comments = action.payload.comments; 
      return state;

    case DELETE_APPOINTMENTS_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
