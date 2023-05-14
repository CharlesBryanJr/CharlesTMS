import express from 'express';
const router = express.Router();

import { getPosts, getPostsBySearch, getPostsByCreator, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';

router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

import auth from "../middleware/auth.js";

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;