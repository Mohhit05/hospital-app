import { all } from "redux-saga/effects"; 
import usersSagas from "./UsersSagas"; 
import feedbackSagas from "./FeedbackSagas";
import appointmentsSagas from "./AppointmentsSagas";
import advicesSagas from "./AdvicesSagas";

export default function* RootSaga() {
   yield all([
      usersSagas(),
      feedbackSagas(), 
      appointmentsSagas(),
      advicesSagas()
   ])
}
