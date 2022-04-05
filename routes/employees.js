const {Employee, validateEmployee} = require('../models/employee.js');
const validateRequest = require('../middlewares/validate-req');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const joi = require('joi');

//R
// get request to get all employees data from table
router.get('/' ,async (req,res)=>{
    const employee = await Employee.find();
    res.send(employee);
});

//R
// get request to get employee data by object id from table

router.get('/:id', async (req,res)=>{
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).send('Employee not found...');
    res.send(employee);
});

//C
// In post request prior to inserting data the middleware validateRequest will be called 
// validateEmploye : Joi validation schema

router.post('/', validateRequest(validateEmployee) ,async (req,res) => {
    let employee = new Employee(_.pick(req.body, ['ID','name', 'job', 'department', 'salary']));
    employee = await employee.save();
    res.send(_.pick(employee, ['ID']))
});

//U
// first find record by object id then update according to the passed values in body
router.put('/:id', async (req,res)=>{
    
    let employee = await Employee.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.send(employee);
});

//finds by id and delete
//D
router.delete('/:id', async (req, res)=>{
    const employee = await Employee.deleteOne({id: req.body.id});
    res.send(employee);
});


module.exports = router;