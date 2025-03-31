import express from 'express'
import { verifyUser } from '../util/VerifyUser.js'
import { createBlog, updateBlog, getBlog, deleteBlog } from '../controller/blog.controller.js'

const router = express.Router()

router.post('/create', verifyUser, createBlog)
router.post('/getpost', getBlog)
router.delete('/deletepost/:postId/:userId', verifyUser, deleteBlog)
router.put('/updatepost/:postId/:userId', verifyUser, updateBlog)

export default router