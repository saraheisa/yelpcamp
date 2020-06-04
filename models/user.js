const mongoose = require('mongoose');
const local = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(local);

module.exports = mongoose.model('User', userSchema);
