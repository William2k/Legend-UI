import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faAngleUp,
  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export const Spinner = () => {
  const SpinnerElem = styled(FontAwesomeIcon)`
    margin-left: 8px;
  `;
  return <SpinnerElem icon={faSpinner} spin />;
};

export const Likes: React.FC<{
  likes: number;
  increaseClick: () => void;
  decreaseClick: () => void;
}> = ({ likes, increaseClick, decreaseClick }) => {
  const LikesElem = styled.div`
    display: inline-block;
    border-left: 1px solid white;
    border-right: 1px solid white;

    > * {
      margin: 0 10px 0 10px;
    }

    > i {
      cursor: pointer;
    }
  `;

  return (
    <LikesElem>
      <i onClick={increaseClick}>
        <FontAwesomeIcon icon={faAngleUp} />
      </i>
      {likes}
      <i onClick={decreaseClick}>
        <FontAwesomeIcon icon={faAngleDown} />
      </i>
    </LikesElem>
  );
};
