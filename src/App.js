import { useState } from "react";
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";

import Nav from "./Components/Nav.jsx";
import Article from "./Components/Article.jsx";
import Output from "./Components/Output";

import "./App.css";

function App() {
  // All,Images,Videos
  const [category, setCategory] = useState("All");

  // [fileBlobs] array of fileBlobs
  const [files, setFiles] = useState(null);

  // [{status,filename,url},{....}]
  const [outputFileObjs, setOutputFileObjs] = useState({});

  // home,output
  // const [route, setRoute] = useState("home");

  const routeMain = (
    <>
      <Nav />
      <Article
        files={files}
        setFiles={setFiles}
        category={category}
        setCategory={setCategory}
        // setRoute={setRoute}
        setOutputFileObjs={setOutputFileObjs}
      />
    </>
  );

  const routeOutput = <Output outputFileObjs={outputFileObjs} />;

  const routing = (
    <Router>
      <Routes>
        <Route path="/" element={routeMain} />
        <Route path="/result" element={routeOutput} />
      </Routes>
    </Router>
  );

  return <div className="App">{routing}</div>;
}

export default App;
