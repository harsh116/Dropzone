import { sliceSize, HOST } from "./constants";

const changeURLParams = (newValue) => {
  const newURL = `${window.location.pathname}${newValue}`;

  window.history.pushState({ path: newURL }, "", newURL);
};

const transferTextToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const promiseSetTimeOut = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const submitIndividual = async (file, index, total, hostname) => {
  const fileSize = file.size;
  const fileName = file.name;

  console.log("file: ", file);

  let start = 0;
  let end = sliceSize;

  const filePieces = [];
  let i = 0;
  while (end <= fileSize) {
    const chunk = file.slice(start, end);
    if (end == fileSize) {
      filePieces.push({ pos: i, chunk, isEnd: true, fileName });
    } else {
      filePieces.push({ pos: i, chunk, isEnd: false });
    }

    start = end;
    end += sliceSize;
    i++;
  }

  if (start < fileSize) {
    const chunk = file.slice(start, fileSize);
    filePieces.push({ pos: i, chunk, isEnd: true, fileName });
    i++;
  }

  let fileLinks = [];
  for (let filePiece of filePieces) {
    const form = new FormData();

    // form.append('data',{pos: filePiece.pos,isEnd: filePiece.isEnd} )
    form.append("pos", filePiece.pos);
    form.append("isEnd", filePiece.isEnd);
    form.append("file", filePiece.chunk);
    form.append("fileName", filePiece.fileName);
    form.append("total", total);
    form.append("fileIndex", index);
    form.append("hostname", hostname);

    const res = await fetch(`${HOST}/submitFiles`, {
      method: "post",
      // headers: {
      // 	'Content-Type': 'multipart/form-data'
      // },
      body: form,
    });
    const data = await res.json();

    console.log("res: ", data);
    if (data.isCompleted === true) {
      fileLinks = data.fileLinks;
      return { status: "ok", fileLinks };
    }

    await promiseSetTimeOut(2000);
  }

  console.log("file: ", file);
  console.log("filePieces: ", filePieces);

  return { status: "error" };
};

// return true only if all files r below given length
// length in bytes
const checkLengthofFiles = (files, length) => {
  for (let file of files) {
    if (file.size > length) {
      return false;
    }
  }

  return true;
};

const getReadableSize = (sizeinBytes) => {
  const formats = ["B", "KB", "MB", "GB"];
  let size = Number(sizeinBytes);
  let format = "";

  for (let i = 0; i < formats.length; i++) {
    // console.log((size < ((2 ** 10)) ** (i + 1)))
    if (size < (2 ** 10) ** (i + 1)) {
      format = formats[i];

      size /= (2 ** 10) ** i;

      break;
    }
  }
  if (size >= (2 ** 10) ** (3 + 1)) {
    format = formats[3];

    size /= (2 ** 10) ** 3;
  }

  return `${size.toFixed(2)} ${format}`;
};

export {
  changeURLParams,
  transferTextToClipboard,
  submitIndividual,
  checkLengthofFiles,
  getReadableSize,
};
