import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/User.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import upload from '../config/multer.js'

const UserRoute = express.Router()

UserRoute.use(authenticate)

UserRoute.get('/get-user/:userid', getUser)
UserRoute.put('/update-user/:userid', upload.single('file'), updateUser)
UserRoute.get('/get-all-user', getAllUser)
UserRoute.delete('/delete/:id', deleteUser)


export default UserRoute