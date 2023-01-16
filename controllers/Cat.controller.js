const {Cat} = require('../models');

module.exports.createCat = async (req, res, next) => {
    try {
        const {body} = req;
        const [result] = await Cat.createCat(body);
        res.status(201).send(result);
    } catch(error) {
        next(error);
    }
}

module.exports.getOneCat = async (req, res, next) => {
    try {
        const {params: {catId}} = req;
        const [foundedCat] = await Cat.getOne(catId);
        res.status(200).send(foundedCat);
    } catch(error) {
        next(error);
    }
}

module.exports.getAllCats = async (req, res, next) => {
    try {
        const allCats = await Cat.getAll();
        res.status(200).send(allCats);
    } catch(error) {
        next(error);
    }
}

module.exports.deleteCat = async (req, res, next) => {
    try {
        const {params: {catId}} = req;
        const [deletedCat] = await Cat.deleteCat(catId);
        if (deletedCat) {
            res.status(200).send(deletedCat);
        } else {
            res.status(404).send('There is no such cat');
        }
    } catch(error) {
        next(error);
    }
}

module.exports.updateCat = async (req, res, next) => {
    try {   
        const {params: {catId}, body} = req;
        const [updated] = await Cat.updateCat({catId, updateValues: body});
        res.status(200).send(updated);
    } catch(error) {
        next(error);
    }
}