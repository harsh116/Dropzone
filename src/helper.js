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

export { changeURLParams, transferTextToClipboard };
