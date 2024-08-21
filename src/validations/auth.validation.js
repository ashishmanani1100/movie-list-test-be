const Joi = require('joi');
const errorMessage = require('../utils/errorMessage');
const { passwordValidation } = require('./custom.validations');

const signUp = Joi.object({
  email: Joi.string().required().trim().email().messages(errorMessage('Email')),
  password: Joi.string()
    .required()
    .custom(passwordValidation)
    .messages(errorMessage('Password', null, 8, 120)),
});

const signIn = Joi.object({
  email: Joi.string().required().trim().email().messages(errorMessage('Email')),
  password: Joi.string()
    .required()
    .min(8)
    .max(120)
    .messages(errorMessage('Password', null, 8, 120)),
});

module.exports = {
  signUp,
  signIn,
};
