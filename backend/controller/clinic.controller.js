import Hospital from '../model/clinic.model.js';
import { ApiError } from '../util/ApiError.js';
import { ApiResponse } from '../util/ApiResponse.js';
import { asyncHandler } from '../util/AsyncHandler.js';

const validateClinicData = (data) => {
  const { name, address, phone } = data;
  if (!name || !address || !phone) {
    throw new ApiError(400, 'All required fields (name, address, phone) must be provided');
  }
};

export const createClinic = asyncHandler(async (req, res) => {
  try {
    validateClinicData(req.body);
    const clinic = new Hospital(req.body);
    await clinic.save();

    res.status(201).json(new ApiResponse(201, clinic, 'Clinic created successfully'));
  } catch (error) {
    console.error('Error creating clinic:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getClinic = asyncHandler(async (req, res) => {
  try {
    const clinic = await Hospital.findById(req.params.id).populate('doctor');
    if (!clinic) throw new ApiError(404, 'Clinic not found');

    res.status(200).json(new ApiResponse(200, clinic));
  } catch (error) {
    console.error('Error getting clinic:', error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const updateClinic = asyncHandler(async (req, res) => {
  try {
    validateClinicData(req.body);
    const clinic = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clinic) throw new ApiError(404, 'Clinic not found');

    res.status(200).json(new ApiResponse(200, clinic, 'Clinic updated successfully'));
  } catch (error) {
    console.error('Error updating clinic:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const deleteClinic = asyncHandler(async (req, res) => {
  try {
    const clinic = await Hospital.findByIdAndDelete(req.params.id);
    if (!clinic) throw new ApiError(404, 'Clinic not found');

    res.status(200).json(new ApiResponse(200, null, 'Clinic deleted successfully'));
  } catch (error) {
    console.error('Error deleting clinic:', error);
    res.status(400).json(new ApiError(400, error.message));
  }
});

export const getClinicDetails = asyncHandler(async (req, res) => {
  try {
    const clinic = await Hospital.findById(req.params.id).populate('doctor');
    if (!clinic) throw new ApiError(404, 'Clinic not found');

    res.status(200).json(new ApiResponse(200, clinic, 'Clinic details retrieved successfully'));
  } catch (error) {
    console.error('Error getting clinic details:', error);
    res.status(404).json(new ApiError(404, error.message));
  }
});

export const searchClinic = asyncHandler(async (req, res) => {
  const query = req.query.query;
  if (!query || query.trim() === '') {
    return res.status(400).json(new ApiError(400, 'Clinic name is required'));
  }

  try {
    const clinics = await Hospital.find({
      name: { $regex: query, $options: 'i' },
    });

    if (clinics.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, 'No clinic found'));
    }

    res.status(200).json(new ApiResponse(200, clinics));
  } catch (error) {
    console.error('Error searching clinic:', error);
    return res.status(404).json(new ApiError(404, error.message));
  }
});
