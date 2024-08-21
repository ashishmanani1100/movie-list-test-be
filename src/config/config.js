const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

// joi schema for env variables
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(4000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(60).description('minutes after which access tokens expire'),
    AWS_ACCESS_KEY_ID: Joi.string().required().description('access key of aws'),
    AWS_SECRET_ACCESS_KEY: Joi.string().required().description('secret key of aws'),
    S3_REGION: Joi.string().required().description('region of s3 bucket'),
    S3_BUCKET: Joi.string().required().description('name of s3 bucket'),
  })
  .unknown();

// validate env variables
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    region: envVars.S3_REGION,
    bucket_name: envVars.S3_BUCKET,
  },
};
