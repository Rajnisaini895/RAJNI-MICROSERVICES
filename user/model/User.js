const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name'], //
        trim:true,
        minlength: [3, 'First name must be at least 3 characters long'],


    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name'],
        trim:true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim:true,
        lowercase: true,
        validate:{
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters long'],
        // Exclude password from query results
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
        
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
userSchema.methods.matchPassword = async function(password) {
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        console.log(error);
        throw  Error('Password comparison failed');}
    
};
const User = mongoose.model('User', userSchema);
module.exports = User;