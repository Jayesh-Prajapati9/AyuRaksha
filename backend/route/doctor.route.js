import express from 'express'
import { VerifyUser } from '../util/VerifyUser.js'
import { createDoctor, getDoctor, updateDoctor, deleteDoctor, getDoctorDetails, searchDoctor, logoutUser } from '../controller/doctor.controller.js'

const route = express.Router()

route.post('/create', VerifyUser, createDoctor);
route.get('/:id', VerifyUser, getDoctor);
route.put('/update/:id', VerifyUser, updateDoctor);
route.delete('/delete/:id', VerifyUser, deleteDoctor);
route.get('/:id/detail', VerifyUser, getDoctorDetails);
route.get('/search', VerifyUser, searchDoctor);
route.post('/logout', VerifyUser, logoutUser);

export default route;