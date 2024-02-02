import "./Submit.scss";
import { HOST } from "../constants";
import { useNavigate } from "react-router-dom";

import { cloudHosts } from "../database/cloudHosts";

import {
  changeURLParams,
  submitIndividual,
  checkLengthofFiles,
} from "../helper";
import { uploadFileDitch } from "../services/fileditch";
import { uploadUploadCare } from "../services/uploadcare";

import Spinner from "./Spinner";

const Submit = (props) => {
  const regexBeforeDot = /(^\w+)\.+/;

  const hostname = regexBeforeDot.exec(props.selectedHost)?.[1] || "catbox";
  // isResult = { isResult };
  // setIsResult = { setIsResult };

  // setErrorMessage = { setErrorMessage };
  // setErrorVisibility = { setErrorVisibility };

  const navigate = useNavigate();
  const uploadFile = async () => {
    try {
      const files = props.files;
      console.log("file: ", files);

      if (files === null || files.length == 0) {
        console.log("No file chosen");
        props.setErrorVisibility(true);
        props.setErrorMessage("No file chosen");
        return;
      }

      if (props.selectedHost.length === 0) {
        console.log("No host selected");
        props.setErrorVisibility(true);
        props.setErrorMessage("Select Hosting platform");
        return;
      }

      const maxLengthInMb = cloudHosts.find(
        (ele) => ele.name === props.selectedHost,
      ).limitInMB;
      const maxLength = maxLengthInMb * 1024 * 1024;
      if (checkLengthofFiles(files, maxLength) === false) {
        console.log("Max length reached");
        props.setErrorVisibility(true);
        props.setErrorMessage(
          `Make sure that any of the file is not longer than ${maxLengthInMb} MB`,
        );
        return;
      }

      // const form = new FormData();

      let i = 0;
      let fileLinks = [];
      props.setIsResult(false);
      // res {status,url,filename}
      for (let file of files) {
        let res;
        if (hostname === "fileditch") {
          const fileLinkObj = await uploadFileDitch(file);
          // debugger;
          fileLinks.push(fileLinkObj);
        } else if (hostname === "uploadcare") {
          const fileLinkObj = await uploadUploadCare(file);
          // debugger;
          fileLinks.push(fileLinkObj);
        } else {
          res = await submitIndividual(file, i, files.length, hostname);
          if (res.status === "ok") {
            fileLinks = res.fileLinks;
          }
        }

        i++;
      }

      if (fileLinks?.length > 0) {
        navigate("/result");
        props.setIsResult(true);
        const newData = fileLinks.map((ele) => {
          return {
            status: ele.status,
            url: ele.data,
            filename: ele.filename,
          };
        });

        props.setOutputFileObjs(newData);
      } else {
        throw new Error("something wrong");
      }
    } catch (err) {
      props.setIsResult(true);
      props.setErrorVisibility(true);
      props.setErrorMessage("Something went wrong");
      console.log("error1: ", err);
    }

    return;

    // // form.append("fileInputs", files);
    // props.setIsResult(false);
    // fetch(`${HOST}/submitFiles`, {
    //   method: "post",
    //   mode: "cors",
    //   //   headers: {
    //   //     "Content-Type": "multipart/form-data",
    //   //   },
    //   body: form,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("data: ", data);
    //     if (data?.length > 0) {
    //       // const newObjs=[]
    //       // for(let obj of data)
    //       // {
    //       //   if(obj.status==='ok'){}
    //       // }

    //       props.setOutputFileObjs(data);
    //       props.setIsResult(true);
    //       // props.setRoute("output");
    //       navigate("/result");

    //       // changeURLParams("result");
    //     } else {
    //       throw Error("something wrong");
    //     }
    //   })
    //   .catch((err) => {
    //     props.setIsResult(true);
    //     props.setErrorVisibility(true);
    //     props.setErrorMessage("Something went wrong");
    //     console.log("error1: ", err);
    //   });
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
