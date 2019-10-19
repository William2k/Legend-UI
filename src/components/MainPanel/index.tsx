import React from "react";
import TrendingGroupsPane from "./TrendingGroupsPane";
import RecentPostsPane from "./RecentPostsPane";
import MainPane from "./MainPane";
import { Container } from "../_Shared/containerStyles";
import styles from "./panel.module.scss";

const MainPanel: React.FC = () => {
  return (
    <Container>
      <div className={styles.pane}>
        <TrendingGroupsPane />
      </div>

      <div className={styles.pane}>
        <RecentPostsPane />
      </div>

      <div className={styles.pane}>
        <MainPane />
      </div>
    </Container>
  );
};

export default MainPanel;
