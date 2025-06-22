import Joi from "joi";

export const userRegisterSchema = Joi.object({
  lastName: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});
