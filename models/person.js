require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URL;
mongoose.connect(url)
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log(error.message)
    })


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,

})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)