'use strict';

const path = require('path');
const httpStatus = require('http-status');
const Model = require('../models');
const { readImportedFile } = require('../utilities');

const create = async (req, res, next) => {
    try {
        let isExisted = await Model.product.findOne({ where: { asin: req.body.asin } });
        if (isExisted) {
            return res.status(httpStatus.BAD_REQUEST).json({ err: `This product is already existed` });
        }
        let product = await Model.product.create({
            asin: req.body.asin,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            brandId: req.body.brandId
        });
        if (req.body.category.length) {
            for (let categoryId of req.body.category) {
                await Model.productCategories.create({ productId: product.id, categoryId: categoryId });
            }
        }
        res.status(httpStatus.CREATED).json({ product });
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        let orderBy = req.query.orderBy || 'id';
        let orderDir = req.query.orderDir || 'ASC';
        let page = parseInt(req.query.page, 10) || 1;
        let pageSize = parseInt(req.query.pageSize, 10) || 10;
        let { rows, count } = await Model.product.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[orderBy, orderDir]],
            where: { isDeleted: false },
            attributes: ['id', 'asin', 'title', 'description', 'imageUrl', 'price'],
            include: [{ model: Model.brand, attributes: ['id', 'name'] }]
        });
        if (!rows.length) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ products: rows, pagination: { page: page, pageSize: pageSize, rowCount: count, pageCount: Math.ceil(count / pageSize) } });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        let product = await Model.product.findOne({
            attributes: ['id', 'asin', 'title', 'description', 'imageUrl', 'price'],
            where: { id: req.params.id, isDeleted: false },
            include: [{ model: Model.brand, attributes: ['id', 'name'] }, { model: Model.category, attributes: ['id', 'name'], through: { attributes: [] } }]
        });
        if (!product) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ product });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        let product = await Model.product.findOne({
            where: { id: req.params.id, isDeleted: false }
        });
        if (!product) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        product = await product.update({ title: req.body.title });
        res.status(httpStatus.OK).json({ product });
    } catch (err) {
        next(err);
    }
};

const importProduct = async (req, res, next) => {
    try {
        let brand;
        let results = await Promise.all([
            readImportedFile(path.join(__dirname, `../files/${req.file.filename}`)),
            Model.category.findOne({ attributes: ['id', 'name'], where: { name: req.body.category } })
        ]);
        for (let product of results[0]) {
            let isExisted = await Model.product.findOne({ attributes: ['id'], where: { asin: product.asin } });
            if (isExisted) {
                continue;
            }
            if (product.brand) {
                brand = await Model.brand.findOne({ where: { name: product.brand } });
                if (!brand) {
                    brand = await Model.brand.create({ name: product.brand });
                }
            }
            let newProduct = await Model.product.create({
                asin: product.asin,
                title: product.title,
                description: product.description,
                imageUrl: product.imUrl,
                price: product.price,
                brandId: brand.id
            });
            if (results[1]) {
                await Model.productCategories.create({ productId: newProduct.id, categoryId: results[1].id });
            }
            if (product.categories.length) {
                product.categories[0].forEach(async (categoryName) => {
                    // check for existence
                    let category = await Model.category.findOne({ attributes: ['id', 'name'], where: { name: categoryName } });
                    // if not, create new category then add it as sub category
                    if (!category) {
                        category = await Model.category.create({ name: categoryName });
                        await Model.subCategories.create({ parentId: results[1].id, childId: category.id });
                    } else {
                        // else, check for existence of subcategory
                        let subcategory = await Model.subCategories.findAll({ where: { parentId: results[1].id, childId: category.id } });
                        if (!subcategory) {
                            await Model.subCategories.create({ parentId: results[1].id, childId: category.id });
                        }
                    }
                    let productCategory = await Model.productCategories.findOne({ where: { productId: newProduct.id, categoryId: category.id } });
                    if (!productCategory) {
                        await Model.productCategories.create({ productId: newProduct.id, categoryId: category.id });
                    }
                });
            }
        }
        res.status(httpStatus.CREATED).json();
    } catch (err) {
        next(err);
    }
};

const askFriend = async (req, res, next) => {
    try {
        let friends = req.body.friendsFbId;
        friends.forEach(async (friend) => {
            let f = await Model.user.findOne({
                attributes: ['id'],
                where: { fbId: friend }
            });
            if (!f) {
                return res.status(httpStatus.NOT_FOUND).json({ message: `friend not found` });
            }
            await Model.activity.create({ userId: req.user.id, activityTypeId: 5, productId: req.params.id, friendId: f.id });
        });
        res.status(httpStatus.OK).json({ message: 'Successfully asked product from friends' });
    } catch (err) {
        next(err);
    }
};

const buyProduct = async (req, res, next) => {
    try {
        if (req.body.activityTypeId === 9) {
            let friends = req.body.friendsFbId;
            friends.forEach(async (friend) => {
                let f = await Model.user.findOne({
                    attributes: ['id'],
                    where: { fbId: friend }
                });
                if (!f) {
                    return res.status(httpStatus.NOT_FOUND).json({ message: `friend not found` });
                }
                await Model.activity.create({ userId: req.user.id, activityTypeId: req.body.activityTypeId, productId: req.body.productId, friendId: f.id });
            });
        }
        res.status(httpStatus.OK).json({ message: 'Successfully bought product' });
    } catch (err) {
        next(err);
    }
};

const suggestFriend = async (req, res, next) => {
    try {
        let friends = req.body.friendsFbId;
        friends.forEach(async (friend) => {
            let f = await Model.user.findOne({
                attributes: ['id'],
                where: { fbId: friend }
            });
            if (!f) {
                return res.status(httpStatus.NOT_FOUND).json({ message: `friend not found` });
            }
            await Model.activity.create({ userId: req.user.id, activityTypeId: 6, productId: req.params.id, friendId: f.id });
        });
        res.status(httpStatus.OK).json({ message: 'Successfully suggested product to friend' });
    } catch (err) {
        next(err);
    }
};

const requstFriend = async (req, res, next) => {
    try {
        let friends = req.body.friendsFbId;
        friends.forEach(async (friend) => {
            let f = await Model.user.findOne({
                attributes: ['id'],
                where: { fbId: friend }
            });
            if (!f) {
                return res.status(httpStatus.NOT_FOUND).json({ message: `friend not found` });
            }
            await Model.activity.create({ userId: req.user.id, activityTypeId: 7, productId: req.params.id, friendId: f.id });
        });
        res.status(httpStatus.OK).json({ message: 'Successfully requested product from friends' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    importProduct,
    askFriend,
    buyProduct,
    suggestFriend,
    requstFriend
};
