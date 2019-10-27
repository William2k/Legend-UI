import React from "react";
import { useSelector } from "react-redux";

import { PostResponse } from "../../../global/models/post-models";
import { getCurrentPageSelector } from "../../../store/page/selector";
import styles from "./pane.module.scss";

const PostPane: React.FC = () => {
  const post = useSelector(getCurrentPageSelector).obj as PostResponse;

  return (
    <div>
      <h2>{post.name}</h2>

      <table className={styles.info}>
        <thead>
          <tr>
            <th>Subscribers</th>
            <th>Comments</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{post.subscriberCount}</td>
            <td>{post.commentsCount}</td>
            <td>{new Date(post.dateCreated).toLocaleDateString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PostPane;
