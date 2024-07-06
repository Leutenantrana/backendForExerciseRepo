const mongoose = require('mongoose');
if (process.argv.length < 3) {
    console.log('give password , name and phoneNumber')
}
const password = process.argv[2]
const uri = `mongodb+srv://ranasagar97411:${password}@cluster0.f8fqylv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false)
mongoose.connect(uri)
    .then(() => console.log("Database connection aestablished"))
    .catch((error) => console.log(error.message))


const personSchema = new mongoose.Schema({
    name: String,
    number: Number,

})

const Person = mongoose.model("Person", personSchema)
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length >= 4) {

    person.save().then(() => {
        console.log("person saved")
        mongoose.connection.close()
    })
} else {
    Person.find({}).then((person) => {
        console.log(person)
        mongoose.connection.close()
    })
}