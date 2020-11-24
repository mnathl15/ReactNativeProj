import React, { useEffect, useState } from 'react';
import {View } from 'react-native';
//import { NativeRouter, Route } from 'react-router-native';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { SignIn } from 'aws-amplify-react-native/dist/Auth';
import { Component } from 'react';
import Confirmation from './components/Confirmation';
import { NativeRouter,Route,useHistory,useLocation} from 'react-router-native';
import { Switch } from 'react-native-gesture-handler';
import Home from './components/Home';






function App(){
    

 
  return(

    
    <NativeRouter>
     <Home/>
    </NativeRouter>
  )
}
    







export default  App;

