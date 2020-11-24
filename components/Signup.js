import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { signUp } from "../reqs.js";

import { verifyForm } from "../utils/verify.js";

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

const Signup = ({ user, setUser, setConfirmEmail, setCurrPage }) => {
  var [formData, setFormData] = useState({
    fields: {
      email: { value: "", error: "" },
      name: { value: "", error: "" },
      password: { value: "", error: "" },
      retype_password: { value: "", error: "" },
      bday: { value: "06-19-1997", error: "" },
    },
    formNum: 1,
  });

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
      const user = await signUp({ ...formData.fields });
      if (user.code) {
        setAwsError(user.code);
        return;
      } else if (user.user) {
        // setUser(user.user);
        setConfirmEmail(formData.fields.email.value);
        setCurrPage("confirmation");
      }

      return;
    }
    setFormData(formData);
  };

  useEffect(() => {
    try {
      if (awsError) {
        // setFormData({fields:{conf_code:{value:'',error:''}},formNum:2});
      }
    } catch (error) {
      console.log(error);
    }
  }, [awsError]);

  const updateField = (name, value) => {
    setFormData({
      fields: {
        ...formData.fields,
        [name]: { ...formData.fields[name], value: value },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text>{formData.fields.email.error}</Text>
          <TextInput
            placeholder="Email"
            name="email"
            onChangeText={(value) => updateField("email", value)}
            value={formData.fields.email.value}
            style={styles.input}
          />
        </View>

        <View>
          <Text>{formData.fields.name.error}</Text>
          <TextInput
            placeholder="Name"
            name="name"
            error={formData.fields.name.error}
            onChangeText={(value) => updateField("name", value)}
            value={formData.fields.name.value}
            style={styles.input}
          />
        </View>
        <View>
          <Text>{formData.fields.password.error}</Text>
          <TextInput
            placeholder="Password"
            name="password"
            onChangeText={(value) => updateField("password", value)}
            value={formData.fields.password.value}
            style={styles.input}
          />
        </View>

        <View>
          <Text>{formData.fields.retype_password.error}</Text>
          <TextInput
            placeholder="Retype Password"
            name="retype_password"
            onChangeText={(value) => updateField("retype_password", value)}
            value={formData.fields.retype_password.value}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            setCurrPage("signin");
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Already have an account?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={submit} style={styles.button}>
          <Text style={styles.text}>Join!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
