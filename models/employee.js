const joi = require('joi');
const mongoose = require('mongoose');
//MongoDB

// This is the model of employees table
// I used mongoose for schema definition
// And joi for validation
const employee = new mongoose.Schema({
    // Min and Max in case we have some specified format of employees ID
    // We can change these condition as per our ID format
    // ID is unique because not multiple employees can have same ID

    ID: {
        type: String,
        required: true,
        unique: true,
        maxLength: 9,
        minLength: 9
    },
    name: {
        type: String,
        required: true,
        // pattern to match name only has letters
        pattern: "^[ A-Za-z]*$"
    },
    job: {
        type: String,
        required: [true,'This field is required'],
        // pattern to match job only has letters
        pattern: "^[ A-Za-z]*$"
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    // Hiring date can be given, by default it will have the value when record is inserted
    hire_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Employee = mongoose.model('Employees', employee);
// Validation using package called Joi
function validateEmployee(employee) {
    const schema = joi.object({
        ID: joi.string().min(9).max(9).required(),
        name: joi.string().required(),
        job: joi.string().required(),
        department: joi.string().required(),
        // Salary can have min value as zeero means no negative values
        // It will give an error if salary is -ve
        salary: joi.number().min(0).required(),
        hire_date: joi.date()
    })
    return schema.validate(employee,{abortEarly: false});
};

exports.Employee= Employee;
exports.validateEmployee = validateEmployee;