/**
 * Generate custom joi message
  @param {} data pass the filed name which we validate
  @param {} message message
  @param {} min min value
  @param {} max max value
  @param {} length value of length
 */
  module.exports = (data, message = null, min = null, max = null, length = null) => {
    return {
      'string.base': message ? `${data} ${message}` : `${data} must be a string.`,
      'string.pattern.base': message ? `${data} ${message}` : `${data} is invalid.`,
      'string.empty': message ? `${data} ${message}` : `${data} can't be blank.`,
      'string.length': message ? `${data} ${message}` : `${data} length must be exactly ${length} characters.`,
      'any.required': message ? `${data} ${message}` : `${data} can't be blank.`,
      'string.alphanum': message ? `${data} ${message}` : `${data} must only contain alpha-numeric characters.`,
      'number.max': message ? `${data} ${message}` : `${data} must be less than or equal to ${max}.`,
      'number.min': message ? `${data} ${message}` : `${data} must be greater than or equal to ${min}.`,
      'number.base': message ? `${data} ${message}` : `${data} must be a number.`,
      'array.base': message ? `${data} ${message}` : `${data} must be an array.`,
      'any.only': message ? `${data} ${message}` : `${data} is not included in list.`,
      'any.invalid': message ? `${data} ${message}` : `${data} is invalid.`,
      'array.length': message ? `${data} ${message}` : `${data} must contains items.`,
      'string.email': message ? `${data} ${message}` : `${data} must be valid.`,
      'array.sparse': message ? `${data} ${message}` : `${data} must not be a sparse array item.`,
      'array.includesRequiredUnknowns': message ? `${data} ${message}` : `${data} required parameter missing.`,
      'date.greater': message ? `${data} ${message}` : `${data} must be greater than ${new Date().toISOString()}`,
      'date.max': message ? `${data} ${message}` : `${data} invalid .`,
      'number.integer': message ? `${data} ${message}` : `${data} must be an integer.`,
      'date.base': message ? `${data} ${message}` : `Please enter valid date in ${data}.`,
      'string.max': message ? `${data} ${message}` : `${data} length must be less than or equal to ${max} characters.`,
      'string.min': message ? `${data} ${message}` : `${data} length must be greater than or equal to ${min} characters.`,
    };
  };
  