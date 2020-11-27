import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { confirmSignUp, signUp } from "../../reqs.js";
import { Authenticator, SignIn } from "aws-amplify-react-native";
import { verifyForm } from "../../utils/verify.js";

const SUCCESS = "SUCCESS";

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

const Confirmation = ({ history, setCurrPage }) => {
  var [formData, setFormData] = useState({
    fields: {
      conf_code: { value: "", error: "" },
      confirm_email: {
        value: history.location.state.confirmEmail || "",
        error: "",
      },
    },
  });

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
      const conf = await confirmSignUp(
        formData.fields.confirm_email.value,
        formData.fields.conf_code.value
      );
      if (conf == SUCCESS) {
        console.log(SUCCESS);
        setCurrPage("signin");
      } else {
        setAwsError("There was an issue with your confirmation code");
      }
    }
    setFormData(formData);
  };

  // On success of field change the state to only handle the confirmation code form.
  // Have to make sure both the success and new state is ready before we load new form

  const updateField = (name, value) => {
    setFormData({
      fields: {
        ...formData.fields,
        [name]: { ...formData.fields[name], value: value },
      },
      formNum: formData.formNum,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text>{formData.fields.conf_code.error}</Text>
          <TextInput
            placeholder="Confirmation Code"
            name="conf_code"
            onChangeText={(value) => updateField("conf_code", value)}
            value={formData.fields.conf_code.value}
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.text}>{"Submit Confirmation!"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Confirmation;
