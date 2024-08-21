const EditImage = `
  """ 
  Payload that contains url to upload image, signed image url, image key. 
  """
  type EditImage {
    putObjectUrl: String
    publicUrl: String
    key: String
  }
`;

module.exports = EditImage;
