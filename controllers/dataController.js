'use strict'

const mongo = require('../utils/mongoConnect');

const add = async (req, res) => {
    let db = mongo.getDb();
    const { name, count } = req.body;
    // Write data in db
    await db.collection('data').insertOne({ name, count });
    // Response
    res.json({
        code: 200,
        status: 'OK'
    });
};

const get = async (req, res) => {
    let db = mongo.getDb();
    // Get data from DB
    let data = await db.collection('data').find({}).toArray();
    // Response
    res.json({
        code: 200,
        status: 'OK',
        data: data
    });
};

module.exports = { add, get }