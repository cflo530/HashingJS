const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PORT = 5000;

app.use(express.json());
const saltRounds = 10;
const plainText = 'ReskillAmericans123';
let hashPassword = '';

bcrypt.genSalt(saltRounds)
    .then(salt => {
        bcrypt.hash(plainText, saltRounds)
        .then(hash => {
            hashPassword = hash;
        });
    });

    console.log(hashPassword);

app.post('/pass', (req, res) => {
    let pass = req.body.pass;
    let result = bcrypt.compareSync(pass, hashPassword);

    return res.json({result});
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});
