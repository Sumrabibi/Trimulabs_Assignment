const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/Employees')
    .then(()=>console.log('Connected...'))
    .catch(() => console.error('Could not connect....'));
}