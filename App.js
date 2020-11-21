import React, { useEffect, useState } from 'react';
import {View } from 'react-native';
//import { NativeRouter, Route } from 'react-router-native';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { SignIn } from 'aws-amplify-react-native/dist/Auth';







  const App=()=>{
  
  return(
    // <NativeRouter>
    //   <View>
    //     <Route exact path="/" component={Signup}/>
    //     <Route exact path="signin" component={Signin}/>
      
        
        
       
    //     {/* <SignIn/> */}
    
      
    //   </View>
    // </NativeRouter>

    <View>
        <Signup/>
        
        {/* <Signin/> */}
    </View>
    
  )
} 






export default App;

