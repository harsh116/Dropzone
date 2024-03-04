// gives url in text form

import { CORS_PROXY } from "../constants";
import { submitIndividualGeneral } from "../helper";
// submitIndividualGeneral(file,HOST/cors-submit/chunks?url=<encoded_url> ,index,total)

const upload0x0st = async (file) => {
  const apiUrl = "https://0x0.st";
  // const url='https://transfer.sh/name.mp3'

  const resObj = {};
  const encodedURL = encodeURIComponent(apiUrl);
  // const proxyURL='http://localhost:8080/cors-submit'
  // const proxyURL = `${CORS_PROXY}/cors-submit`;
  const proxyURL = `${CORS_PROXY}/cors-submit/chunks`;

  const fetchurl = `${proxyURL}?url=${encodedURL}`;

  try {
    if (file) {
      // resObj : {status,data,filename} , here data is ddl url

      // this response data contain field data(which is actually file link) and maybe status and message field

      // const formData = new FormData();
      // formData.append("file", file);
      const fileFieldName = "file";
      const bodyToBeSent = {};

      const resData = await submitIndividualGeneral(
        file,
        fetchurl,
        "text",
        "form",
        "post",
        bodyToBeSent,
        fileFieldName
      );
      console.log(resData);
      if (resData.status === "ok") {
        resObj["status"] = "ok";
        resObj["data"] = resData.data;
        resObj["filename"] = file.name;
        return resObj;
      }
    }
  } catch (err) {
    console.log("err: ", err);
    throw err;
  }

  // const formData = new FormData();
  // formData.append("file", file);
  // //    const apiUrl = "https://0x0.st";
  // try {
  //   const response = await fetch(fetchurl, {
  //     method: "POST",
  //     // headers: {
  //     // 	'Content-Type': 'multipart/form-data',
  //     // },
  //     body: formData,
  //   });
  //   const data = await response.text();

  //   return resObj;
  //   // Handle the response data here
  // } catch (error) {
  //   console.error("Error:", error);
  // }
  // Handle errors here
};

export { upload0x0st };
