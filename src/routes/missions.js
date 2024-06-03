import express from 'express';
import { addMission, getMissions, getMissionsBySite, updateMission, deleteMission, runMission } from '../controllers/missionController.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/', auth, addMission);


router.get('/', auth, getMissions);


router.get('/site/:siteId', auth, getMissionsBySite);


router.put('/:id', auth, updateMission);


router.delete('/:id', auth, deleteMission);


router.post('/:id/run', auth, runMission);

export default router;
