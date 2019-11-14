import React from "react";

import TrendingGroupsPane from "./TrendingGroupsPane";
import RecentPostsPane from "./RecentPostsPane";
import MainPane from "./MainPane";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { getCurrentPageSelector } from "../../store/page/selector";
import { PageEnum } from "../../store/page/types";
import PostPane from "../Group/Post/Pane";
import GroupPane from "../Group/Pane";

const MainPanel: React.FC = () => {
  const currentPage = useSelector(getCurrentPageSelector);

  return (
    <>
      {currentPage.page === PageEnum.Group && (
        <div className={styles.pane}>
          <GroupPane />
        </div>
      )}

      <div className={styles.pane}>
        <TrendingGroupsPane />
      </div>

      <div className={styles.pane}>
        <RecentPostsPane />
      </div>

      <div className={styles.pane}>
        <MainPane />
      </div>
    </>
  );
};

export default MainPanel;
