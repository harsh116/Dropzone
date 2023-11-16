import { useState } from "react";
import "./Nav.scss";

const Nav = (props) => {
  return (
    <div className="Nav">
      <div className="hostingSiteList">
        <select name="hostingSitesList">
          <option value="none"> --Select hosting service-- </option>
          <option value="catbox.moe">CatBox.moe</option>
          <option value="sdrive.app">Sdrive.app</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
