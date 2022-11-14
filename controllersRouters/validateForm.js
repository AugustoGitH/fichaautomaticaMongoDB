const Joi = require("@hapi/joi")

const registerValidate = (data)=>{
    const schema = Joi.object({
        nome: Joi.string().required("Digite seu nome e tente novamente!").min(3).max(50),
        email: Joi.string().email({ tlds: { allow: false } }).required("Digite seu email e tente novamente!").min(3).max(50),
        password: Joi.string().required("Digite sua senha e tente novamente!").min(6).max(50),
    })
    return schema.validate(data)
}

const loginValidate = (data)=>{
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required("Digite seu email e tente novamente!").required("Digite seu email e tente novamente!").min(3).max(50),
        password: Joi.string().required("Digite sua senha e tente novamente!").min(6).max(50),
    })
    return schema.validate(data)
}

module.exports = {registerValidate, loginValidate}