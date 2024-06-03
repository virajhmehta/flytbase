import express from 'express';
import { addSite, getSites, updateSite, deleteSite } from '../controllers/siteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/', auth, addSite);


router.get('/', auth, getSites);


router.put('/:id', auth, updateSite);


router.delete('/:id', auth, deleteSite);

export default router;
