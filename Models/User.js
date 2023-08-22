import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {isEmail} from 'validator';



//creating user collection schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Enter the password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

// export the User model
const User = mongoose.model('user', UserSchema);
export default User;