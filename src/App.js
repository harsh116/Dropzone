import { useState } from "react";
import "./App.scss";

import Nav from "./Components/Nav.jsx";
import Article from "./Components/Article.jsx";

import "./App.css";

function App() {
  const [] = useState();

  return (
    <div className="App">
      <Nav />
      <Article />
    </div>
  );
}

export default App;
