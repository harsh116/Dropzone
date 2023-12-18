import "./Description.scss";
import { cloudHosts } from "../database/cloudHosts";

const Description = (props) => {
  const getDescription = (arr, name) => {
    for (let obj of arr) {
      if (obj.name === name) {
        return obj.description || "";
      }
    }

    return "";
  };

  const { selectedHost } = props;
  //   console.log("selectedHost state: ", selectedHost);
  const hostDesciption = getDescription(cloudHosts, selectedHost);

  return (
    <div className="Description">
      <p>{hostDesciption}</p>
    </div>
  );
};

export default Description;
