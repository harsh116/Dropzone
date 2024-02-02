import { UPLOADCARE_PUBKEY } from "../constants";

const uploadUploadCare = async (file) => {
  const uploadcare_url = "https://upload.uploadcare.com/base/";
  const uploadedURLBase = "https://ucarecdn.com";

  console.log("file: ", file);
  const formData = new FormData();
  formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBKEY);
  formData.append("my_file.jpg", file);
  const resObj = {};

  try {
    const res = await fetch(uploadcare_url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log("Upload successful:", data);
    const uuid = data["my_file.jpg"];
    const url = `${uploadedURLBase}/${uuid}/`;
    console.log("upurl: ", url);
    resObj["status"] = "ok";
    resObj["data"] = url;
    resObj["filename"] = file.name;

    return resObj;
  } catch (error) {
    console.error("Error during upload:", error);
  }
};

export { uploadUploadCare };
