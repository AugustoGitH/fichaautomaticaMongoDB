const { array } = require("@hapi/joi")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nome: {type: String, required: true, minLength: 3, maxLength: 50},
    email: {type: String, required: true, minLength: 3, maxLength: 100},
    password: {type: String, required: true, min: 6, max: 200},
    createAd: {type: Date, default: Date.now},
    admin: {type: Boolean, default: false},
    imagePerfil: {type: String, default: "/public/Assets/user.png"},
    fichas: {type: Array, default: []}
})

module.exports = mongoose.model("User", userSchema)