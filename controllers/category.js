'use strict';

const httpStatus = require('http-status');
const Model = require('../models');

const create = async (req, res, next) => {
    try {
        let category = await Model.category.findOne({ where: { name: req.body.name } });
        if (category) {
            return res.status(httpStatus.OK).json({ category });
        }
        category = await Model.category.create(req.body);
        res.status(httpStatus.CREATED).json({ category });
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
        let { rows, count } = await Model.category.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[orderBy, orderDir]],
            attributes: ['id', 'name'],
            where: { isParent: true }
        });
        if (!rows.length) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ categories: rows, pagination: { page: page, pageSize: pageSize, rowCount: count, pageCount: Math.ceil(count / pageSize) } });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        let category = await Model.category.findOne({
            attributes: ['id', 'name'],
            where: { id: req.params.id },
            include: [{
                model: Model.product,
                attributes: ['id', 'asin', 'title', 'description', 'imageUrl', 'price'],
                through: { attributes: [] }
            }]
        });
        if (!category) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ category });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        let category = await Model.category.findById(req.params.id);
        if (!category) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        category = await category.update({ name: req.body.name });
        res.status(httpStatus.OK).json({ category });
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        let orderBy = req.query.orderBy || 'id';
        let orderDir = req.query.orderDir || 'ASC';
        let page = parseInt(req.query.page, 10) || 1;
        let pageSize = parseInt(req.query.pageSize, 10) || 10;
        let { rows, count } = await Model.product.findAndCountAll({
            subQuery: false,
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[orderBy, orderDir]],
            attributes: ['id', 'title', 'imageUrl', 'price'],
            where: { isDeleted: false },
            include: [{
                model: Model.category,
                attributes: [],
                through: { attributes: [] },
                where: { id: req.params.id }
            }]
        });
        if (!rows.length) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ products: rows, pagination: { page: page, pageSize: pageSize, rowCount: count, pageCount: Math.ceil(count / pageSize) } });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    getProduct
};
