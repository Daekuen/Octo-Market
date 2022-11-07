import * as Joi from 'joi';

const createOrderJoiSchema = Joi.object({
  orderInfo: Joi.array()
    .items(
      Joi.object({
        itemId: Joi.string().trim().required(),
        name: Joi.string().trim().required().min(1).max(30).allow(''),
        amount: Joi.number().integer().required().min(1).max(100),
        price: Joi.number().integer().required().min(1),
      }),
    )
    .required()
    .min(1),
  totalPrice: Joi.number().integer().required().min(1),
  email: Joi.string().trim().email().required(),
  address: Joi.object({
    postalCode: Joi.string().trim().length(5).required().messages({
      'string.length': 'postalCode는 5글자입니다.',
    }),
    address1: Joi.string().trim().min(1).required().messages({
      'string.min': 'address1은 최소 1글자입니다.',
    }),
    address2: Joi.string().trim().min(1).required().messages({
      'string.min': 'address2은 최소 1글자입니다.',
    }),
  }),
});

const updateOrderJoiSchema = Joi.object({
  state: Joi.string()
    .required()
    .valid(
      'Payment Completed',
      'Before Delivery',
      'Delivery in Progress',
      'Delivery Completed',
    ),
});

export { createOrderJoiSchema, updateOrderJoiSchema };