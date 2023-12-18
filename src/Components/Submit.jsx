import "./Submit.scss";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";

import { changeURLParams } from "../helper";
import Spinner from "./Spinner";

const Submit = (props) => {
  // isResult = { isResult };
  // setIsResult = { setIsResult };

  // setErrorMessage = { setErrorMessage };
  // setErrorVisibility = { setErrorVisibility };

  const navigate = useNavigate();
  const uploadFile = () => {
    const files = props.files;
    console.log("file: ", files);

    if (files === null || files.length == 0) {
      console.log("No file chosen");
      props.setErrorVisibility(true);
      props.setErrorMessage("No file chosen");
      return;
    }

    const form = new FormData();

    files.forEach((file) => {
      form.append("fileInputs", file); // Append files to the FormData object
    });

    // form.append("fileInputs", files);
    props.setIsResult(false);
    fetch(`${HOST}/submitFiles`, {
      method: "post",
      mode: "cors",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data?.length > 0) {
          // const newObjs=[]
          // for(let obj of data)
          // {
          //   if(obj.status==='ok'){}
          // }

          props.setOutputFileObjs(data);
          props.setIsResult(true);
          // props.setRoute("output");
          navigate("/result");

          // changeURLParams("result");
        } else {
          throw Error("something wrong");
        }
      })
      .catch((err) => {
        props.setIsResult(true);
        props.setErrorVisibility(true);
        props.setErrorMessage("Something went wrong");
        console.log("error1: ", err);
      });
  };

  return (
    <div className="submit">
      <Spinner
        visible={!props.isResult}
        // type={"Fidget Spinner"}
        // type={"Circles"}
        type={"Oval"}
        // text={"Uploading"}
        color="black"
      />
      {props.isResult ? (
        <button onClick={uploadFile} className="submit_btn">
          Upload
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Submit;
