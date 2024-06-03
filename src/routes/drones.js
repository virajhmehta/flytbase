import express from 'express';
import { addDrone, getDrones, getDronesBySite, updateDrone, deleteDrone, shiftDrone } from '../controllers/droneController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/', auth, addDrone);


router.get('/', auth, getDrones);


router.get('/site/:siteId', auth, getDronesBySite);


router.put('/:id', auth, updateDrone);


router.delete('/:id', auth, deleteDrone);


router.patch('/:id/shift', auth, shiftDrone);

export default router;
