const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');
const { TOKEN_TYPES } = require('./../utils/constants');

/**
 * Generates a JWT token for a given user with specified expiration and type.
 * @param {Object} user - The user information to include in the token's payload.
 * @param {moment.Moment} expires - The expiration time for the token as a moment.js object.
 * @param {string} type - The type of the token
 * @param {string} [secret=config.jwt.secret] - The secret key used to sign the token.
 * @returns {string} The generated JWT token.
 */
const generateToken = (user, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Generates an access token for a given user ID.
 * @param {string} id - ID of user.
 * @returns {Promise<Object>} A promise that resolves to an object containing the access token and its expiration time.
 */
const generateAccessToken = async (id) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationDays, 'minutes');
  const accessToken = generateToken({ id }, accessTokenExpires, TOKEN_TYPES.ACCESS);

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  };
};

/**
 * Extracts and verifies a user from a request token.
 * @param {Object} req - The request object from which the token is extracted.
 * @returns {Promise<string>} A promise that resolves to the user's identifier if the token is valid.
 * @throws {Error} Throws an error with the message 'Forbidden' if the token is missing or invalid.
 */
const getUserFromToken = (req) => {
  let token;
  // extract token from request headers
  if (req?.headers) {
    const authHeader = req.headers.authorization;
    token = authHeader && authHeader.split(' ')[1];
  }

  if (!token) throw new Error('Forbidden');

  // return JWT token verification status
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        reject(new Error('Forbidden'));
      } else {
        resolve(user.sub);
      }
    });
  });
};

module.exports = { generateAccessToken, getUserFromToken };
