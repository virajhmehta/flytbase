import Mission from '../model/Mission.js';
import Drone from '../model/Drone.js';

const addMission = async (req, res) => {
    try {
        const { site, type } = req.body;

        if (!site || !type) {
            return res.status(400).json({ error: "Site and type are required." });
        }

        const mission = new Mission({ ...req.body, user: req.user._id });
        await mission.save();
        res.status(201).send(mission);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getMissions = async (req, res) => {
    try {
        const missions = await Mission.find({ user: req.user._id });
        res.send(missions);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getMissionsBySite = async (req, res) => {
    try {
        const missions = await Mission.find({ site: req.params.siteId, user: req.user._id });
        res.send(missions);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateMission = async (req, res) => {
    try {
        const { site } = req.body;

        if (site) {
            return res.status(400).json({ error: "Missions cannot be changed from one site to another." });
        }

        const mission = await Mission.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!mission) {
            return res.status(404).send();
        }
        res.send(mission);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteMission = async (req, res) => {
    try {
        const mission = await Mission.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!mission) {
            return res.status(404).send();
        }
        res.send(mission);
    } catch (error) {
        res.status(500).send(error);
    }
};

const runMission = async (req, res) => {
    try {
        const mission = await Mission.findOne({ _id: req.params.id, user: req.user._id });
        if (!mission) {
            return res.status(404).send();
        }

        const drone = await Drone.findOne({ _id: req.body.droneId, user: req.user._id, site: mission.site });
        if (!drone) {
            return res.status(400).json({ error: "Invalid droneId or you do not have access to this drone, or the drone is not assigned to the mission's site." });
        }

        
        res.send({ message: `Mission ${mission._id} is being executed by drone ${drone._id}` });
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addMission, getMissions, getMissionsBySite, updateMission, deleteMission, runMission };
