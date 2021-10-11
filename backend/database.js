const mongoose = require("mongoose")

const atlas = "mongodb+srv://Jepsx:1234Jepsx98@cluster0.wcxzg.mongodb.net/myFirstDatabase"

mongoose.connect(atlas, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Conectado Correctamente a la BD :)"))
    .catch(err => console.log(err))

module.exports = mongoose;
