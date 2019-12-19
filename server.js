const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/accounts", async (req, res, next) => {
    try {
        res.json(await db('accounts').select())
    } catch (err) {
        next(err)
    }
})

server.get("/accounts/:id", async (req, res, next) => {
    try {
        res.json(await db('accounts').where('id', req.params.id))
    } catch(err) {
        next(err)
    }
})

server.post("/accounts", async (req, res, next) => {

    const newAcct = {
        name: req.body.name,
        budget: req.body.budget
    }

    try {
        await db("accounts").insert(newAcct)
        res.status(201).json({ 
            message: "Entry created as:",
            name: `${newAcct.name}`,
            budget: `${newAcct.budget}`
        })
    } catch (err) {
        next(err)
    }
})

server.put("/accounts/:id", async (req, res, next) => {
    const changes = {
        name: req.body.name,
        budget: req.body.budget
    }

    try {
        await db("accounts").where('id', req.params.id).update(changes)
        res.status(200).json({ message: "User has been updated!" })
    } catch(err) {
        next(err)
    }
})

server.delete("/accounts/:id", async (req, res, next) => {
    try {
        await db("accounts").where('id', req.params.id).del()
        res.status(200).json({ message: "User has been deleted" })
    } catch(err) {
        next(err)
    }
})

module.exports = server;