import React from "react";
import TrendingGroupsPane from "./TrendingGroupsPane";
import RecentPostsPane from "./RecentPostsPane";
import MainPane from "./MainPane";
import styles from "./index.module.scss";

const MainPanel: React.FC = () => {
  return (
    <React.Fragment>
      <div className={styles.pane}>
        <TrendingGroupsPane />
      </div>

      <div className={styles.pane}>
        <RecentPostsPane />
      </div>

      <div className={styles.pane}>
        <MainPane />
      </div>
    </React.Fragment>
  );
};

export default MainPanel;
