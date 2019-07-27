var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: '1'
    },
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    }
});

userSchema.method('comparePassword', function(password = '') {
    return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model('user', userSchema);