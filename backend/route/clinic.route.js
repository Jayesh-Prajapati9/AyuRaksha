import express from 'express';
import { VerifyUser } from '../util/VerifyUser.js';
import { createClinic, getClinic, updateClinic, deleteClinic, getClinicDetails, searchClinic } from '../controller/clinic.controller.js';

const route = express.Router();

route.post('/create', VerifyUser, createClinic);
route.get('/:id', VerifyUser, getClinic);
route.put('/update/:id', VerifyUser, updateClinic);
route.delete('/delete/:id', VerifyUser, deleteClinic);
route.get('/:id/detail', VerifyUser, getClinicDetails);
route.get('/search', VerifyUser, searchClinic);

export default route;
