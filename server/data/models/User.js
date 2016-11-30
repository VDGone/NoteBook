const mongoose = require('mongoose');
const encryption = require('../../utilities/encryption');

const requiredMessage = '{PATH} is required';
const defaultPicture = 'http://www.freelanceme.net/Images/default%20profile%20picture.png';

module.exports.init = function() {
    let userSchema = mongoose.Schema({
        username: { type: String, required: requiredMessage, unique: true },
        salt: String,
        hashPass: String,
        firstName: { type: String, required: requiredMessage},
        lastName: { type: String, required: requiredMessage},
        email: { type: String, required: requiredMessage },
        profilePicture: { type: String, default: defaultPicture },
        city: {type: String},
        friends: [{}],
        performOn: [{}],
        isLocked: {type: Boolean}
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    let User = mongoose.model('User', userSchema);
};