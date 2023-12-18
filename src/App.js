import { useState } from "react";
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
// import "primeflex/primeflex.css"; // css utility
// import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; //

import Nav from "./Components/Nav.jsx";
import Article from "./Components/Article.jsx";
import Output from "./Components/Output";

import "./App.css";
import Description from "./Components/Description";
import ToastEle from "./Components/Toast";

function App() {
  // catbox,sdrive
  const [selectedHost, setSelectedHost] = useState("");

  // All,Images,Videos
  const [category, setCategory] = useState("All");

  // [fileBlobs] array of fileBlobs
  const [files, setFiles] = useState(null);

  // [{status,filename,url},{....}]
  const [outputFileObjs, setOutputFileObjs] = useState({});

  // for Spinner component which will be visible if value is false
  const [isResult, setIsResult] = useState(true);

  // for error message at top
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // home,output
  // const [route, setRoute] = useState("home");

  const routeMain = (
    <>
      <PrimeReactProvider>
        <ToastEle
          errorVisibility={errorVisibility}
          errorMessage={errorMessage}
          setErrorVisibility={setErrorVisibility}
        />
      </PrimeReactProvider>
      <Nav setSelectedHost={setSelectedHost} />
      <Article
        files={files}
        setFiles={setFiles}
        category={category}
        setCategory={setCategory}
        // setRoute={setRoute}
        isResult={isResult}
        setIsResult={setIsResult}
        setOutputFileObjs={setOutputFileObjs}
        //
        setErrorMessage={setErrorMessage}
        setErrorVisibility={setErrorVisibility}
      />
      <Description selectedHost={selectedHost} />
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
