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
  liked: boolean | null;
  increaseClick: () => void;
  decreaseClick: () => void;
  clickedAgain: () => void;
}> = ({
  likes,
  increaseClick,
  decreaseClick,
  clickedAgain,
  liked,
  ...props
}) => {
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

    .liked {
      color: rgb(255, 50, 1);
    }
  `;

  return (
    <LikesElem>
      <i
        className={liked === true ? "liked" : ""}
        onClick={liked === true ? clickedAgain : increaseClick}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </i>
      {likes}
      <i
        className={liked === false ? "liked" : ""}
        onClick={liked === false ? clickedAgain : decreaseClick}
      >
        <FontAwesomeIcon icon={faAngleDown} />
      </i>
    </LikesElem>
  );
};
