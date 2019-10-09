import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container as containerStyle } from "./_Shared/containerStyles";

const Container = styled(containerStyle)`
  font-size: 30px;
`;

const NotAuthorised: React.FC = () => {
  return (
    <Container>
      <h1>Not Authorised</h1>
      <p>
        You are authorised to view this page. Please go to
        <Link to="/"> Homepage</Link>.
      </p>
    </Container>
  );
};

export default NotAuthorised;
