import { useEffect, useRef, useState } from "react";

import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";

const ToastEle = (props) => {
  const toast = useRef(null);

  const { errorMessage, errorVisibility, setErrorVisibility } = props;

  const showError = () => {
    toast.current.show({ severity: "error", detail: errorMessage, life: 3000 });
  };

  useEffect(() => {
    if (errorVisibility === true) {
      showError();
      setErrorVisibility(false);
    }
  }, [errorVisibility]);

  return <Toast ref={toast} position="top-center" />;
};

export default ToastEle;
