import React, { useRef, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

import { maxHeightExpand } from "../_Shared/animations";
import { currentUserActions } from "../../store/currentUser/actions";
import {
  getUserSelector,
  getCurrentUserSelector
} from "../../store/currentUser/selectors";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignInModal from "../_Shared/modals/signin";
import SignUpModal from "../_Shared/modals/signup";
import useNotification from "../_Shared/notifications";
import { NotificationType } from "../_Shared/notifications/types";

const Navigation = styled.nav`
  z-index: 1000;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  font-weight: bolder;
  width: 100%;
  transition: 0.6s;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  .navbar-brand {
    transition: 1s;
    color: #26d0d0;
  }
  .nav-link {
    transition: 0.6s;
  }
`;

const LoggedIn = styled.ul`
  margin: 0;
  a {
    color: #26d0d0;
  }
`;

const DropDownMenuElem = styled(DropdownMenu)`
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 5px;
  transition: 0.6s;
  .logout-btn {
    float: right;
  }
  &.show {
    max-height: 0;
    animation: ${maxHeightExpand()} 13s;
    overflow: hidden;
  }
`;

enum NavModals {
  None,
  Signin,
  Signup
}

const Nav: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserSelector);
  const user = useSelector(getUserSelector);
  const { notify } = useNotification();
  const searchInput = useRef(null);

  const [modal, setModal] = useState(NavModals.None);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(currentUserActions.signOutUser());
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      setModal(NavModals.None);
    }
  }, [currentUser.isLoggedIn]);

  const handleCloseModal = () => {
    setModal(NavModals.None);
  };

  const handleSignUpUserSubmmit = () => {
    notify(
      "Sign Up Success",
      "User has been added sucessfully",
      NotificationType.Default
    );

    setModal(NavModals.Signin);
  };

  return (
    <Navigation className="navbar navbar-expand-lg navbar-dark position-fixed">
      <NavLink to="/" className="navbar-brand">
        Legend
      </NavLink>

      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {currentUser.isLoggedIn ? (
            <React.Fragment>
              <NavItem>
                <NavLink to="/account" className="nav-link">
                  Account
                </NavLink>
              </NavItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavItem>
                <a
                  className={`${styles.modalLink} nav-link`}
                  onClick={() => setModal(NavModals.Signin)}
                >
                  Signin
                </a>
              </NavItem>
              <NavItem>
                <a
                  className={`${styles.modalLink} nav-link`}
                  onClick={() => setModal(NavModals.Signup)}
                >
                  Signup
                </a>
              </NavItem>

              {modal === NavModals.Signin && (
                <SignInModal showModal={true} toggle={handleCloseModal} />
              )}
              {modal === NavModals.Signup && (
                <SignUpModal
                  showModal={true}
                  toggle={handleCloseModal}
                  userSubmited={handleSignUpUserSubmmit}
                />
              )}
            </React.Fragment>
          )}
        </ul>
        <form onSubmit={search}>
          <input type="search" ref={searchInput} />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </form>
        {currentUser.isLoggedIn && (
          <LoggedIn className="list-unstyled">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Logged in as {user.username}
              </DropdownToggle>
              <DropDownMenuElem right>
                <DropdownItem>
                  <Link to="/account"> Account </Link>
                </DropdownItem>

                <button className="logout-btn btn btn-warning" onClick={logout}>
                  Logout
                </button>
              </DropDownMenuElem>
            </UncontrolledDropdown>
          </LoggedIn>
        )}
      </div>
    </Navigation>
  );
};

export default Nav;
