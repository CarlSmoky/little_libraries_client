import React from "react";
import Resizer from "react-image-file-resizer";

// from https://javascript.plainenglish.io/compression-images-before-upload-in-a-react-app-with-react-image-file-resizer-c1870c9bcf47

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      800,
      "JPEG",
      100, // quality, out of 100
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

export  {resizeFile, dataURIToBlob};
