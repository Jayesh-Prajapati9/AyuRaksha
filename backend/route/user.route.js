import express from 'express'
import { VerifyUser } from '../util/VerifyUser.js'
import { getUser, updateUser, deleteUser, getUserDetails, searchUser, logoutUser, updateUserData } from '../controller/user.controller.js'

const route = express.Router()

route.get('/search', VerifyUser, searchUser)
route.get('/:id', VerifyUser, getUser)
route.put('/update/:id', VerifyUser, updateUser)
route.put('/update/profile/:id', VerifyUser, updateUserData)
route.delete('/delete/:id', VerifyUser, deleteUser)
route.post('/logout', VerifyUser, logoutUser)
route.get('/:id/detail', VerifyUser, getUserDetails)

export default route