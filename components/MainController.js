import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Route, withRouter } from "react-router-native";
import { Switch } from "react-native-gesture-handler";

import { getCurrentUser } from "../reqs";
import Home from "./Home/Home";
import Confirmation from "./Confirmation/Confirmation";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";

const DEFAULT_ROUTE = "home";

function MainController({ history }) {
  const [user, setUser] = useState();
  const [currPage, setCurrPage] = useState(`${DEFAULT_ROUTE}`);
  const [confirmEmail, setConfirmEmail] = useState(); //Used to send the email for the confirmation code

  useEffect(() => {
    switch (currPage) {
      case "confirmation":
        if (!!confirmEmail) {
          history.push(`/${currPage}`, { confirmEmail: confirmEmail });
        }
        return;
      case "home":
        if (!!user) {
          history.push(`/${currPage}`, { user: user });
        }
        return;
      default:
        history.push(`/${currPage}`);
    }
  }, [currPage, confirmEmail]);

  useEffect(() => {
    const currUser = async () => {
      try {
        getCurrentUser()
          .then((user) => {
            setUser(user.user);
          })
          .catch(() => {
            history.push(`${DEFAULT_ROUTE}`);
          });
      } catch (error) {
        history.push(`${DEFAULT_ROUTE}`);
      }
    };

    currUser();
  }, []);

  return (
    <View>
      <Route
        exact
        path="/signup"
        render={(props) => {
          return (
            <Signup
              {...props}
              setUser={(user) => setUser(user)}
              setConfirmEmail={(email) => setConfirmEmail(email)}
              setCurrPage={(path) => {
                setCurrPage(path);
              }}
              user={user}
            />
          );
        }}
      />
      <Route
        exact
        path="/signin"
        render={(props) => {
          return (
            <Signin
              {...props}
              setUser={(user) => setUser(user)}
              setConfirmEmail={(email) => setConfirmEmail(email)}
              setCurrPage={(path) => {
                setCurrPage(path);
              }}
              user={user}
            />
          );
        }}
      />

      <Route
        exact
        path="/confirmation"
        render={(props) => {
          return (
            <Confirmation
              {...props}
              setCurrPage={(path) => {
                setCurrPage(path);
              }}
            />
          );
        }}
      />
      <Route
        path="/home"
        render={(props) => {
          return (
            <Home
              {...props}
              setCurrPage={(path) => {
                setCurrPage(path);
              }}
            />
          );
        }}
      />
    </View>
  );
}

export default withRouter(MainController);
