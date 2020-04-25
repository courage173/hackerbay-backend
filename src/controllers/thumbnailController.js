import imageThumbnail from 'image-thumbnail';

const Imagethumbnail = async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(404).json({
      status: "error",
      message: "No image url found"
    });
  }
  const imageRegex = /\.(jpeg|jpg|gif|png)$/;
  if (imageRegex.test(imageUrl) === false) {
    return res.status(403).json({
      status: 'error',
      message: 'invalid image url'
    });
  }
  const options = { width: 50, length: 50 };
  const thumbnail = await imageThumbnail({ uri: imageUrl }, options);
  return res.status(200).json({
    status: "success",
    thumbnail
  });
};

export default Imagethumbnail;
