import {
  CREATE_USERS_RED,
  DELETE_USERS_RED,
  GET_USERS_RED,
  UPDATE_USERS_RED,
} from "../Constants";

export default function UsersReducer(state=[], action) {
  switch (action.type) {
    case CREATE_USERS_RED:
      return [...state, action.payload];

    case GET_USERS_RED:
      return action.payload;

    case UPDATE_USERS_RED:
      let index = state.findIndex((x) => x.id === action.payload.id);
      state[index].name = action.payload.name;
      state[index].specialty = action.payload.specialty;
      state[index].email = action.payload.email;
      state[index].phone = action.payload.phone; 
      state[index].active = action.payload.active;
      return state;

    case DELETE_USERS_RED:
      return state.filter((x) => x.id !== action.payload.id);

    default:
      return state;
  }
}
