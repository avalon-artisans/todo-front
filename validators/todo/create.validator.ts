import Joi from 'joi';
import BaseValidator from '../base.validator';

/**
 * LoginValidator class
 * @author Kenneth Sumang
 * @since  2023.06.08
 */
export default class CreateTodoValidator extends BaseValidator {
  /**
   * Schema for login
   * @protected
   */
  protected schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    due_date: Joi
      .string()
      .regex(/^\d{4}-(1[0-2]|0[0-9])-[0-3]\d\s([0-1][0-9]|2[0-3]):[0-5]\d:[0-5]\d$/)
      .allow(null, '')
      .optional(),
  });
}