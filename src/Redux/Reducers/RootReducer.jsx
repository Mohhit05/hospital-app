import { combineReducers } from "@reduxjs/toolkit";
import UsersReducer from "./UsersReducer"; 
import FeedbackReducer from "./FeedbackReducer";
import AppointmentsReducer from "./AppointmentsReducer";
import AdvicesReducer from "./AdvicesReducer";

export default combineReducers({
  UsersStateData: UsersReducer,
  FeedbackStateData: FeedbackReducer,
  AppointmentsStateData: AppointmentsReducer,
  AdvicesStateData: AdvicesReducer,
});
