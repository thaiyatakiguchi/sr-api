'use strict';

const httpStatus = require('http-status');
const Model = require('../models');

const create = async (req, res, next) => {
    try {
        let brand = await Model.brand.findOne({ where: { name: req.body.name } });
        if (brand) {
            return res.status(httpStatus.OK).json({ brand });
        }
        brand = await Model.brand.create(req.body);
        res.status(httpStatus.CREATED).json({ brand });
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
        let { rows, count } = await Model.brand.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[orderBy, orderDir]],
            attributes: ['id', 'name']
        });
        if (!rows.length) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ brands: rows, pagination: { page: page, pageSize: pageSize, rowCount: count, pageCount: Math.ceil(count / pageSize) } });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        let brand = await Model.brand.findById(req.params.id);
        if (!brand) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        res.status(httpStatus.OK).json({ brand });
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
            limit: pageSize,
            offset: (page - 1) * pageSize,
            order: [[orderBy, orderDir]],
            attributes: ['id', 'title', 'imageUrl', 'price'],
            where: { isDeleted: false },
            include: [{
                model: Model.brand,
                attributes: [],
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

const update = async (req, res, next) => {
    try {
        let brand = await Model.brand.findById(req.params.id);
        if (!brand) {
            return res.status(httpStatus.NOT_FOUND).json();
        }
        brand = await brand.update({ name: req.body.name });
        res.status(httpStatus.OK).json({ brand });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    getProduct,
    update
};
