import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

interface Props {
  showLikeButtons: boolean;
  likes: number;
  liked: boolean | null;
  increaseClick: () => void;
  decreaseClick: () => void;
  clickedAgain: () => void;
}

const Likes: React.FC<Props> = ({
  likes,
  increaseClick,
  decreaseClick,
  clickedAgain,
  liked,
  showLikeButtons,
  ...props
}) => {
  return (
    <LikesElem>
      {showLikeButtons ? (
        <i
          className={liked === true ? "liked" : ""}
          onClick={liked === true ? clickedAgain : increaseClick}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </i>
      ) : (
        <span> </span>
      )}
      {likes}
      {showLikeButtons ? (
        <i
          className={liked === false ? "liked" : ""}
          onClick={liked === false ? clickedAgain : decreaseClick}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </i>
      ) : (
        <span> </span>
      )}
    </LikesElem>
  );
};

export default Likes;
