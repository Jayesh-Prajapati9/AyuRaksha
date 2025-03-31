import Appointment from "../model/appointment.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { asyncHandler } from "../util/AsyncHandler.js";

const validateAppointmentData = (data) => {
  const { doctor, patient, date } = data;
  if (!doctor || !patient || !date) {
    throw new ApiError(
      400,
      "All required fields (doctor, patient, date) must be provided"
    );
  }
};

const isWithin24Hours = (appointmentDate) => {
  const now = new Date();
  const hoursDifference = (new Date(appointmentDate) - now) / (1000 * 60 * 60);
  return hoursDifference <= 24;
};

export const bookAppointment = asyncHandler(async (req, res) => {
  try {
    validateAppointmentData(req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();

    res
      .status(201)
      .json(
        new ApiResponse(201, appointment, "Appointment booked successfully")
      );
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getAppointment = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctor patient"
    );
    if (!appointment) throw new ApiError(404, "Appointment not found");

    res.status(200).json(new ApiResponse(200, appointment));
  } catch (error) {
    console.error("Error getting appointment:", error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const updateAppointment = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new ApiError(404, "Appointment not found");

    if (req.user.role === "doctor") {
      if (!appointment.doctor.includes(req.user._id)) {
        throw new ApiError(
          403,
          "Only the assigned doctor can update this appointment"
        );
      }
    } else if (req.user.role === "patient") {
      if (appointment.patient.toString() !== req.user._id.toString()) {
        throw new ApiError(
          403,
          "You are not authorized to update this appointment"
        );
      }
      if (isWithin24Hours(appointment.date)) {
        throw new ApiError(
          400,
          "You can only update an appointment 24 hours before the scheduled time"
        );
      }
    }

    validateAppointmentData(req.body);
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedAppointment,
          "Appointment updated successfully"
        )
      );
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new ApiError(404, "Appointment not found");

    if (
      req.user.role === "doctor" &&
      !appointment.doctor.includes(req.user._id)
    ) {
      throw new ApiError(
        403,
        "Only the assigned doctor can delete this appointment"
      );
    } else if (
      req.user.role === "patient" &&
      appointment.patient.toString() !== req.user._id.toString()
    ) {
      throw new ApiError(
        403,
        "You are not authorized to delete this appointment"
      );
    }

    await Appointment.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(new ApiResponse(200, null, "Appointment deleted successfully"));
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getAppointmentDetails = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "doctor patient"
    );
    if (!appointment) throw new ApiError(404, "Appointment not found");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          appointment,
          "Appointment details retrieved successfully"
        )
      );
  } catch (error) {
    console.error("Error getting appointment details:", error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const searchAppointment = asyncHandler(async (req, res) => {
  const { doctorId, patientId } = req.query;

  if (!doctorId && !patientId) {
    return res
      .status(400)
      .json(new ApiError(400, "DoctorId or PatientId is required for search"));
  }

  try {
    const query = {};
    if (doctorId) query.doctor = doctorId;
    if (patientId) query.patient = patientId;

    const appointments = await Appointment.find(query).populate(
      "doctor patient"
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No appointments found"));
    }

    res.status(200).json(new ApiResponse(200, appointments));
  } catch (error) {
    console.error("Error searching appointments:", error);
    return res.status(404).json(new ApiError(404, error.message));
  }
});

export const getAvailableSlots = asyncHandler(async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId }).sort(
      "date"
    );

    const now = new Date();
    const availableSlots = [];

    for (let i = 9; i < 18; i++) {
      // Assuming working hours from 9 AM to 6 PM
      const slot = new Date(now.setHours(i, 0, 0, 0));
      if (!appointments.some((app) => new Date(app.date).getHours() === i)) {
        availableSlots.push(slot);
      }
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          availableSlots,
          "Available slots retrieved successfully"
        )
      );
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(400).json(new ApiError(400, error.message));
  }
});
