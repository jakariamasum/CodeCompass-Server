import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UservalidationSchemas } from './user.validate'
import { UserControllers } from './user.controller'
const router=express.Router()

router.post('/create-user',validateRequest(UservalidationSchemas.createUserValidationSchema),UserControllers.createUser);

export const UserRoutes=router