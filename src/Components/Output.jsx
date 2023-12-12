import "./Output.scss";

import { transferTextToClipboard } from "../helper";

const Output = (props) => {
  const { outputFileObjs } = props;

  const copyFn = () => {
    let str = "";
    for (let obj of outputFileObjs) {
      if (obj.status === "ok") {
        str += `${obj.filename}\t${obj.url}\n`;
      }
    }
    transferTextToClipboard(str);
  };

  const arr = [];

  for (let i = 0; i < 10; i++) {
    arr.push({ filename: "filename1", url: "url" });
  }

  let fileLists = [];
  if (outputFileObjs?.length > 0) {
    fileLists = outputFileObjs.map((ele) => {
      if (ele.status != "ok") {
        return (
          <li className="file-item">
            <div className="file-name">{ele.filename}</div>
            <a href="#" className="download-link" download>
              {"Error"}
            </a>
          </li>
        );
      }
      return (
        <li className="file-item">
          <div className="file-name">{ele.filename}</div>
          <a href={ele.url} className="download-link" download>
            {ele.url}
          </a>
        </li>
      );
    });
  }

  const fileListsUl = <ul className="file-list">{fileLists}</ul>;

  return (
    <div className="output_container">
      <div className="Output">
        <div className="heading">
          <h1>Uploaded Files</h1>
        </div>
        <div className="list">{fileListsUl}</div>
      </div>
      <div className="copy">
        <button className="copy_btn" onClick={copyFn}>
          <i class="fa fa-copy"></i>
        </button>
      </div>
    </div>
  );
};

export default Output;
