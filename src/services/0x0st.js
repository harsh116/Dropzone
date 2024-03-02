// gives url in text form

import { CORS_PROXY } from "../constants";

const upload0x0st = async (file) => {
  const apiUrl = "https://0x0.st";
  // const url='https://transfer.sh/name.mp3'

  const resObj = {};
  const encodedURL = encodeURIComponent(apiUrl);
  // const proxyURL='http://localhost:8080/cors-submit'
  const proxyURL = `${CORS_PROXY}/cors-submit`;

  const fetchurl = `${proxyURL}?url=${encodedURL}`;

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    //    const apiUrl = "https://0x0.st";
    try {
      const response = await fetch(fetchurl, {
        method: "POST",
        // headers: {
        // 	'Content-Type': 'multipart/form-data',

        // },
        body: formData,
      });
      const data = await response.text();
      console.log(data);
      resObj["status"] = "ok";
      resObj["data"] = data;
      resObj["filename"] = file.name;
      return resObj;
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
    }
    // Handle errors here
  }
};

export { upload0x0st };
