// gives url in text form

import { CORS_PROXY } from "../constants";
import { submitIndividualGeneral } from "../helper";

const uploadTransferSh = async (file) => {
  const filename = file.name;
  const fileRegexname = /(.*)\..+$/;
  const fileRegexExt = /.*\.(.+)$/;
  const fileNameWithoutExtension = fileRegexname.exec(filename)[1];
  const extension = fileRegexExt.exec(filename)[1];
  const encodedFileName = `${encodeURIComponent(
    fileNameWithoutExtension
  )}.${extension}`;

  const apiUrl = `https://transfer.sh/${encodedFileName}`;
  // const url='https://transfer.sh/name.mp3'

  const resObj = {};
  const encodedURL = encodeURIComponent(apiUrl);
  // const proxyURL='http://localhost:8080/cors-submit'
  // const proxyURL = `${CORS_PROXY}/cors-submit`;
  const proxyURL = `${CORS_PROXY}/cors-submit/chunks`;

  const fetchurl = `${proxyURL}?url=${encodedURL}`;

  if (file) {
    try {
      const resData = await submitIndividualGeneral(
        file,
        fetchurl,
        "text",
        "file",
        "put"
      );
      console.log(resData);
      if (resData.status === "ok") {
        resObj["status"] = "ok";
        resObj["data"] = resData.data;
        resObj["filename"] = file.name;
        return resObj;
      }
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  // if (file) {
  //   //    const apiUrl = "https://0x0.st";
  //   try {
  //     const response = await fetch(fetchurl, {
  //       method: "PUT",
  //       // headers: {
  //       // 	'Content-Type': 'multipart/form-data',

  //       // },
  //       body: file,
  //     });
  //     const data = await response.text();
  //     console.log(data);
  //     resObj["status"] = "ok";
  //     resObj["data"] = data;
  //     resObj["filename"] = file.name;
  //     return resObj;
  //     // Handle the response data here
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  //   // Handle errors here
  // }
};

export { uploadTransferSh };
