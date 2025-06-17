import Joi from "joi";

export const productoCreateSchema = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().min(0),
  stock: Joi.number().min(0),
});

export const productoUpdateSchema = Joi.object({
  name: Joi.string().trim(),
  price: Joi.number().min(0),
  stock: Joi.number().min(0),
});
