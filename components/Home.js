import React, { useEffect, useState } from "react";
import { View } from "react-native";
//import { NativeRouter, Route } from 'react-router-native';

import { SignIn } from "aws-amplify-react-native/dist/Auth";

import {
  NativeRouter,
  Route,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-native";
import { Switch } from "react-native-gesture-handler";
import Confirmation from "./Confirmation";
import Signin from "./Signin";
import Signup from "./Signup";
import { getCurrentUser } from "../reqs";

function Home({ history }) {
  const [user, setUser] = useState();
  const [currPage, setCurrPage] = useState("signup");
  const [confirmEmail, setConfirmEmail] = useState(); //Used to send the email for the confirmation code

  useEffect(() => {
    switch (currPage) {
      case "confirmation":
        if (!!confirmEmail) {
          history.push(`/${currPage}`, { confirmEmail: confirmEmail });
        }
        return;
      case "app":
        if (!!user) {
          history.push(`/${currPage}`, { user: user });
        }
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
            history.push("/signup");
          });
      } catch (error) {
        history.push("/signup");
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
    </View>
  );
}

export default withRouter(Home);
