const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter an address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
});


// fire a function before doc saved to db
companySchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
companySchema.statics.login = async function(name, password) {
    const company = await this.findOne({ name });
    if (company) {
        const auth = await bcrypt.compare(password, company.password);
        if (auth) {
            return company;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect name');
};

const Company = mongoose.model('company', companySchema);

module.exports = Company;