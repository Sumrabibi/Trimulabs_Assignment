const express = require('express');
const employee  = require('../routes/employees');

const cors = require('cors');


module.exports = function(app) {
    app.use(cors({
        credentials: true,
        origin: true,
    }))
    app.use(express.json());
    app.set('trust proxy', true);
    
    app.use('/api/employee', employee);

    app.all('*', async (req,res,next) => {
        next(new NotFoundError());
    })

}