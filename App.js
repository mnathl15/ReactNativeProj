import React, { useEffect, useState } from 'react';
import {View } from 'react-native';
//import { NativeRouter, Route } from 'react-router-native';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { SignIn } from 'aws-amplify-react-native/dist/Auth';







  const App=()=>{

    const[user,setUser] = useState();

  


  
    return(
      <View>
          {/* <Signup 
            setUser={(user)=>setUser(user)}
            user={user}
          /> */}
          <Signin 
            setUser={(user)=>setUser(user)}
            user={user}
          />
          
          
      </View>
    
    )
} 






export default App;

