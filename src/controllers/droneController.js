import Drone from '../model/Drone.js';
import Site from '../model/Site.js';

const addDrone = async (req, res) => {
    try {
        const { name, siteId, drone_type, make_name, category } = req.body;

        if (!name || !siteId || !drone_type || !make_name || !category) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const site = await Site.findOne({ _id: siteId, user: req.user._id });
        if (!site) {
            return res.status(400).json({ error: "Invalid siteId or you do not have access to this site." });
        }

        const drone = new Drone({ ...req.body, user: req.user._id });
        await drone.save();
        res.status(201).send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getDrones = async (req, res) => {
    try {
        const drones = await Drone.find({ user: req.user._id });
        res.send(drones);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDronesBySite = async (req, res) => {
    try {
        const drones = await Drone.find({ site: req.params.siteId, user: req.user._id });
        res.send(drones);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateDrone = async (req, res) => {
    try {
        const { siteId } = req.body;

        if (siteId) {
            const site = await Site.findOne({ _id: siteId, user: req.user._id });
            if (!site) {
                return res.status(400).json({ error: "Invalid siteId or you do not have access to this site." });
            }
        }

        const drone = await Drone.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteDrone = async (req, res) => {
    try {
        const drone = await Drone.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(500).send(error);
    }
};

const shiftDrone = async (req, res) => {
    try {
        const { newSiteId } = req.body;

        const site = await Site.findOne({ _id: newSiteId, user: req.user._id });
        if (!site) {
            return res.status(400).json({ error: "Invalid newSiteId or you do not have access to this site." });
        }

        const drone = await Drone.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { site: newSiteId },
            { new: true }
        );

        if (!drone) {
            return res.status(404).send();
        }
        res.send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
};

export { addDrone, getDrones, getDronesBySite, updateDrone, deleteDrone, shiftDrone };
