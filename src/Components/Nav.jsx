import { useState } from "react";
import "./Nav.scss";

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
          <option value="catbox.moe">CatBox.moe</option>
          <option value="sdrive.app">Sdrive.app</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
