import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import emailRegex from "email-regex";

import { signIn, signUp } from "../reqs.js";
import { Authenticator, SignIn } from "aws-amplify-react-native";
import { verifyForm } from "../utils/verify.js";

const CONFIRMATION_EXCEPTION = "UserNotConfirmedException";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
    marginBottom: "15%",
    height: "auto",
    padding: 50,
  },
  input: {
    borderStyle: "solid",
    width: 250,
    margin: 15,
    height: 40,
  },

  button: {
    marginTop: 50,
    width: 150,
    height: 40,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    color: "black",
  },
});

const Signin = ({ user, setUser, setConfimation, setCurrPage }) => {
  let [formData, setFormData] = useState({
    fields: {
      email: { value: "", error: "" },
      password: { value: "", error: "" },
    },
    formNum: 1,
  });
  const [userSubmitError, setUserSubmitError] = useState("");
  const [newFormReady, setNewFormReady] = useState(false);
  const [awsError, setAwsError] = useState();

  const submit = async () => {
    formData = JSON.parse(verifyForm(formData));
    let formErrors = 0;
    Object.entries(formData.fields).map((element) => {
      if (element[1].error) {
        formErrors += 1;
      }
    });

    if (formErrors <= 0) {
      const user = await signIn({ ...formData.fields });
      try {
        if (user.code) {
          setAwsError(user.code);
          return;
        }
        setUser(user.user);
        setCurrPage("app");
      } catch (error) {
        console.log(error);
      }
    }

    setFormData(formData);
  };
  const updateField = (name, value) => {
    setFormData({
      fields: {
        ...formData.fields,
        [name]: { ...formData.fields[name], value: value },
      },
      formNum: formData.formNum,
    });
  };

  useEffect(() => {
    try {
      if (awsError == CONFIRMATION_EXCEPTION) {
        setConfimation(formData.fields.email.value, false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [awsError]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>{awsError}</Text>
        <View>
          <View>
            <Text>{formData.fields.email.error}</Text>
            <TextInput
              placeholder="Email"
              name="email"
              onChangeText={(value) => updateField("email", value)}
              style={styles.input}
            />
          </View>

          <View>
            <Text>{formData.fields.password.error}</Text>
            <TextInput
              placeholder="Password"
              error={formData.fields.password.error}
              name="password"
              onChangeText={(value) => updateField("password", value)}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.text}>{"Log in!"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
