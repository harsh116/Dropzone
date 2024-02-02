import { useState } from "react";
import { cloudHosts } from "../database/cloudHosts";
import "./Nav.scss";

const Option = (props) => {
  const { value } = props;
  return <option value={value}>{value}</option>;
};

const Nav = (props) => {
  const { setSelectedHost } = props;

  const handleChange = (value) => {
    console.log("selected host: ", value);
    if (value == "none") {
      setSelectedHost("");
      return;
    }

    setSelectedHost(value);
  };

  const options = cloudHosts.map((cloudHost) => {
    return <Option value={cloudHost.name} />;
  });

  return (
    <div className="Nav">
      <div className="hostingSiteList">
        <select
          onChange={(e) =>
            handleChange(e.target.options[e.target.selectedIndex].value)
          }
          name="hostingSitesList"
        >
          <option value="none"> --Select hosting service-- </option>
          {options}
        </select>
      </div>
    </div>
  );
};

export default Nav;
