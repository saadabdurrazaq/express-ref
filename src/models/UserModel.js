const mongoose = require("mongoose"); 
const { Schema } = mongoose;

const UserSchema = new Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,  
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      required: true, 
      enum: ["user", "admin", "super-admin"],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password         // do not reveal passwordHash
    }
})

const User =  mongoose.model("user", UserSchema);

module.exports = User;