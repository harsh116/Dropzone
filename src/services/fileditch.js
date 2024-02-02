// Upload successful: {
//     "success": true,
//     "files": [
//         {
//             "hash": "819e3c3b",
//             "name": "The Weeknd - A Lesser Man.mp3",
//             "url": "https:\/\/small.fileditchnew.ch\/s3\/TDCNrtKwSdYUBpxPLeds.mp3",
//             "size": 4829120
//         }
//     ]
// }

const uploadFileDitch = async (file) => {
  console.log("file: ", file);
  const formData = new FormData();
  formData.append("files[]", file);
  const resObj = {};

  try {
    const res = await fetch("https://up1.fileditch.com/upload.php", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log("Upload successful:", data);
    resObj["status"] = data.success === true ? "ok" : "error";
    resObj["data"] = data?.files[0]?.url;
    resObj["filename"] = file.name;

    return resObj;
  } catch (error) {
    console.error("Error during upload:", error);
  }
};

export { uploadFileDitch };
