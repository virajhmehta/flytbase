import Site from '../model/Site.js';

const isValidLatitude = (lat) => lat >= -90 && lat <= 90;
const isValidLongitude = (lon) => lon >= -180 && lon <= 180;

const addSite = async (req, res) => {
    try {
        const { site_name, position } = req.body;

        if (!site_name || !position || !isValidLatitude(position.latitude) || !isValidLongitude(position.longitude)) {
            return res.status(400).json({ error: "Invalid site data. Site name and valid position (latitude, longitude) are required." });
        }

        const site = new Site({ ...req.body, user: req.user._id });
        await site.save();
        res.status(201).send(site);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getSites = async (req, res) => {
    try {
        const sites = await Site.find({ user: req.user._id });
        res.send(sites);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateSite = async (req, res) => {
    try {
        const { site_name, position } = req.body;

        if (position && (!isValidLatitude(position.latitude) || !isValidLongitude(position.longitude))) {
            return res.status(400).json({ error: "Invalid position data. Valid latitude and longitude are required." });
        }

        const site = await Site.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!site) {
            return res.status(404).send();
        }
        res.send(site);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteSite = async (req, res) => {
    try {
        const site = await Site.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!site) {
            return res.status(404).send();
        }
        res.send(site);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addSite, getSites, updateSite, deleteSite };
