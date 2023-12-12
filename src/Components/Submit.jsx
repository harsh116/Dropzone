import "./Submit.scss";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";

import { changeURLParams } from "../helper";

const Submit = (props) => {
  const navigate = useNavigate();
  const uploadFile = () => {
    const files = props.files;
    console.log("file: ", files);

    if (files === null || files.length == 0) {
      console.log("No file chosen");
      return;
    }

    const form = new FormData();

    files.forEach((file) => {
      form.append("fileInputs", file); // Append files to the FormData object
    });

    // form.append("fileInputs", files);

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
          // props.setRoute("output");
          navigate("/result");

          // changeURLParams("result");
        } else {
          throw Error("something wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="submit">
      <button onClick={uploadFile} className="submit_btn">
        Upload
      </button>
    </div>
  );
};

export default Submit;
