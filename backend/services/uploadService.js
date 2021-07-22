const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const status = require('http-status');

const APP_NAME = 'chat-app-with-pvt';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const size = {
  avatar: {
    width: 300,
    height: 300,
  },
};

function Cloudinary(folderName, fileFieldName) {
  this.storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `${APP_NAME}/${folderName}`,
      allowedFormats: ['jpg', 'jpeg', 'png', 'WEBP', 'png'],
      transformation: [
        {
          width: size[fileFieldName].width,
          height: size[fileFieldName].height,
          crop: 'limit',
        },
      ],
    },
  });
  this.upload = multer({ storage: this.storage }).single(fileFieldName);

  this.middleware = (req, res, next) => {
    return this.upload(req, res, (err) => {
      if (err) {
        return res.status(status.BAD_REQUEST).json({ message: err.message });
      }
      next();
    });
  };

  this.removeFile = (url) => {
    const regex = new RegExp(`${APP_NAME}\/${folderName}\/\\w+`, 'g');
    const idImage = url.match(regex);
    if (idImage) {
      return cloudinary.v2.uploader.destroy(idImage[0]);
    }
  };
}

// eslint-disable-next-line func-names
module.exports = function (folderName, fileFieldName) {
  return new Cloudinary(folderName, fileFieldName);
};
