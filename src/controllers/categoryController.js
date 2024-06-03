import Category from '../model/Category.js';

const addCategory = async (req, res) => {
    try {
        const category = new Category({ ...req.body, user: req.user._id });
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { addCategory, getCategories, updateCategory, deleteCategory };
