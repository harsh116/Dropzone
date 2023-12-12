import "./Article.scss";
import Submit from "./Submit";
// import "./Article.scss";
import DropFileInput from "./drop-file-input/DropFileInput";

import { useState, useEffect } from "react";

import { Fragment } from "react";

const Article = (props) => {
  const onFileChange = (files) => {
    // console.log(files);
    props.setFiles(files);
  };

  const categories = ["All", "Images", "Videos"];

  const buttons = categories.map((ca) => {
    // debugger;
    return (
      <button
        onClick={() => props.setCategory(ca)}
        className={ca === props.category ? "active" : ""}
      >
        {ca}
      </button>
    );
  });

  return (
    <div className="Article">
      <div className="ArticleNav">{buttons}</div>
      <div className="dropFileInputContainer">
        <DropFileInput category={props.category} onFileChange={onFileChange} />
      </div>
      <Submit
        setOutputFileObjs={props.setOutputFileObjs}
        // setRoute={props.setRoute}
        files={props.files}
      />
    </div>
  );
};

export default Article;
