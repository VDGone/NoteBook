const mongoose = require("mongoose");
const encryption = require("../../utilities/encryption");

const requiredMessage = "{PATH} is required";
const defaultPicture = "http://trophia.com/wp-content/uploads/2014/07/default-profile.jpg";

module.exports.init = () => {
    let userSchema = mongoose.Schema({
        username: { type: String, required: requiredMessage, unique: true },
        salt: String,
        hashPass: String,
        firstName: { type: String, required: requiredMessage},
        lastName: { type: String, required: requiredMessage},
        email: { type: String, required: requiredMessage },
        profilePicture: { type: String, default: defaultPicture },
        messages: [{ type: Object}],
        city: { type: String },
        friends: [{ type: Object }],
        performOn: [{ type: Object }],
        isLocked: { type: Boolean }
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

    let User = mongoose.model("User", userSchema);
};