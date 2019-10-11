import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export const Spinner = () => {
  const SpinnerElem = styled(FontAwesomeIcon)`
    margin-left: 8px;
  `;
  return <SpinnerElem icon={faSpinner} spin />;
};