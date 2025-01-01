const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    // username: {
    //     type: String
    // },
    email: {
        type: String,
        required: true,
        unique: true,
        // index: true, 
        // sparse: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// static signup method
userSchema.statics.signup = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Not a valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({email}) // if it doesn't find a match, exists will be null
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // put this new password in the database
    const user = await this.create({email, password: hash})

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email}) // if it doesn't find a match, exists will be null
    if (!user) {
        throw Error('Incorrect Email')
    }
    // check password matches hashed DB password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }

    return user

}

module.exports = mongoose.model('User', userSchema);