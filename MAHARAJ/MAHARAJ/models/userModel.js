const mongoose = require('mongoose'); 
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true,
    },
    lastname: {
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    bookings: [{  // track bookings
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }]
});

//Hash Password before saving
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    });

    //Compare password
    userSchema.methods.isPasswordMatched = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };    

//Export the model
module.exports = mongoose.model('User', userSchema);