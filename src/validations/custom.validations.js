const passwordValidation = (value, helpers) => {
  console.log('');

  if (value === undefined) return value;
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
  if (value.length > 120) {
    return helpers.message('Password must be less than 120 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Password must contain at least 1 letter and 1 number');
  }
  return value;
};

module.exports = {
  passwordValidation,
};
