const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3, HeadObjectCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config/config');

const Bucket = config.aws.bucket_name;

const s3 = new S3({
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
  region: config.aws.region,
});

/**
 * Checks if an object exists in the S3 bucket.
 * @param {string} Key - The key of the object in the S3 bucket.
 * @returns {Promise<boolean>} A Promise that resolves with true if the object exists, false otherwise.
 */
async function doesObjectExist(Key) {
  try {
    const params = { Bucket, Key };
    const command = new HeadObjectCommand(params);
    await s3.send(command);
    return true;
  } catch (error) {
    if (error.name === 'NotFound') {
      return false;
    }
    throw error;
  }
}

/**
 * Generates a presigned URL for uploading an object to an S3 bucket.
 * @param {string} key - The key under which to store the object in the S3 bucket.
 * @returns {Promise<string>} A Promise that resolves with the presigned URL.
 */
const signedPutObjectUrl = async (key) => {
  const EXPIRES_IN_MINUTES = 30; // in env?? or const?

  const params = {
    Bucket,
    Key: key,
  };

  return getSignedUrl(s3, new PutObjectCommand(params), {
    expiresIn: EXPIRES_IN_MINUTES * 60,
  });
};

/**
 * Retrieves a public URL for accessing an object from the S3 bucket.
 * @param {string} key - The key of the object in the S3 bucket.
 * @returns {Promise<string | Error>} A Promise that resolves with the public URL or an Error if the URL cannot be created.
 */
const signedGetObjectUrl = async (key) => {
  try {
    const EXPIRES_IN_MINUTES = 30;

    const params = {
      Bucket,
      Key: key,
    };

    const imageExist = await doesObjectExist(key);
    if (!imageExist) return;

    const publicUrl = await getSignedUrl(s3, new GetObjectCommand(params), {
      expiresIn: EXPIRES_IN_MINUTES * 60,
    });

    if (!publicUrl) {
      throw new Error('Cannot create public URL');
    }

    return publicUrl;
  } catch (error) {
    return error;
  }
};

/**
 * Deletes an object from the S3 bucket.
 * @param {string} key - The key of the object to delete from the S3 bucket.
 * @returns {Promise<void>} A Promise that resolves once the object is deleted successfully.
 */
const deleteObject = async (key) => {
  const params = {
    Bucket,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};

module.exports = {
  signedPutObjectUrl,
  signedGetObjectUrl,
  deleteObject,
};
