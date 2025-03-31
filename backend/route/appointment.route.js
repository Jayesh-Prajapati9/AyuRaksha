import express from "express";
import { VerifyUser } from "../util/VerifyUser.js";
import {
  bookAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentDetails,
  searchAppointment,
  getAvailableSlots
} from "../controller/appointment.controller.js";

const route = express.Router();

route.post("/book", VerifyUser, bookAppointment);
route.get("/:id", VerifyUser, getAppointment);
route.put("/update/:id", VerifyUser, updateAppointment);
route.delete("/delete/:id", VerifyUser, deleteAppointment);
route.get("/:id/detail", VerifyUser, getAppointmentDetails);
route.get("/search", VerifyUser, searchAppointment);
route.get("/doctor/:doctorId/available-slots", VerifyUser, getAvailableSlots);

export default route;
