import Doctor from '../model/doctor.model.js';
import { ApiError } from '../util/ApiError.js';
import { ApiResponse } from '../util/ApiResponse.js';
import { asyncHandler } from '../util/AsyncHandler.js';

const validateDoctorData = (data) => {
  const { name, email } = data;
  if (!name || !email) {
    throw new ApiError(400, 'All required fields (name, email, password) must be provided');
  }
};

export const createDoctor = asyncHandler(async (req, res) => {
  try {
    validateDoctorData(req.body);
    const doctor = new Doctor(req.body);
    await doctor.save();

    res.status(201).json(new ApiResponse(201, doctor, 'Doctor created successfully'));
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getDoctor = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (!doctor) throw new ApiError(404, 'Doctor not found');

    res.status(200).json(new ApiResponse(200, doctor));
  } catch (error) {
    console.error('Error getting doctor:', error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const updateDoctor = asyncHandler(async (req, res) => {
  try {
    validateDoctorData(req.body);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) throw new ApiError(404, 'Doctor not found');

    res.status(200).json(new ApiResponse(200, doctor, 'Doctor updated successfully'));
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) throw new ApiError(404, 'Doctor not found');

    res.status(200).json(new ApiResponse(200, null, 'Doctor deleted successfully'));
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getDoctorDetails = asyncHandler(async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('hospital').populate('patient');
    if (!doctor) throw new ApiError(404, 'Doctor not found');

    res.status(200).json(new ApiResponse(200, doctor, 'Doctor details retrieved successfully'));
  } catch (error) {
    console.error('Error getting doctor details:', error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const searchDoctor = asyncHandler(async (req, res) => {
  const query = req.query.query;
  if (!query || query.trim() === '') {
    return res.status(400).json(new ApiError(400, 'Doctor name is required'));
  }

  try {
    const doctors = await Doctor.find({
      name: { $regex: query, $options: 'i' },
    }).select('name email specialization');

    if (doctors.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, 'No doctor found'));
    }

    res.status(200).json(new ApiResponse(200, doctors));
  } catch (error) {
    console.error('Error searching doctor:', error);
    return res.status(404).json(new ApiError(404, error.message));
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json(new ApiResponse(200, null, 'User has been logged out successfully'));
  } catch (error) {
    console.error('Error while logging out user:', error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});
