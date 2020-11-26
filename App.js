import React from "react";

import { NativeRouter } from "react-router-native";

import MainController from "./components/MainController";

function App() {
  return (
    <NativeRouter>
      <MainController />
    </NativeRouter>
  );
}

export default App;
