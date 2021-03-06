import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: "us-east-1:b7141a41-abfd-4e04-bd28-915f4b2d7a31",
    region: "us-east-1",
    userPoolId: "us-east-1_71zexM0Mw",
    userPoolWebClientId: "4j9hpgpj64e91213pr4fcaevrb",
  },
});

export const signUp = async (state) => {
  try {
    const [email, password] = [state.email.value, state.password.value];
    const user = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    return error;
  }
};

export const signIn = async (state) => {
  try {
    const [email, password] = [state.email.value, state.password.value];

    const user = await Auth.signIn({
      username: email,
      password: password,
    });

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const confirmSignUp = async (username, conf_code) => {
  try {
    const conf = await Auth.confirmSignUp(username, conf_code);
    return conf;
  } catch (error) {
    return error;
  }
};

export const getCurrentUser = () => {
  try {
    Auth.currentSession()
      .then((user) => {
        return user;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    return error;
  }
};
