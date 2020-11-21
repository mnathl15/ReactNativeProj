import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import emailRegex from "email-regex";

import {signIn, signUp} from "../reqs.js";
import { Authenticator, SignIn } from 'aws-amplify-react-native';
import { verifyForm } from '../utils/verify.js';


const CONFIRMATION_EXCEPTION = "UserNotConfirmedException";

const styles = StyleSheet.create ({
    container:{
        height:'100%',
        justifyContent:'center',
    },
    form:{
        alignItems:'center',
        marginBottom:"15%",
        height:'auto',
        padding:50
    },
    input:{
        
        borderStyle:'solid', 
        width:250,
        margin:15,
        height:40,
        
        
    },

    button:{
        marginTop:50,
        width:150,
        height:40,
        padding:0,
        justifyContent:'center',
        alignItems:'center',
       

        
    },
    text:{
        fontSize:13,
        color:'black',
        
        
        
    }
  
})

const submitConfCode = ()=>{
    
}

const Signin=()=>{

    const [state,setState] = useState({
        email:{value:'',error:''},
        password:{value:'',error:''},

    });
    const [userSubmitError,setUserSubmitError] = useState("");
    const [success,setSuccess] = useState(false);
    const [newFormReady, setNewFormReady] = useState(false);
    
    const submit = async ()=>{
        const formData = JSON.parse(verifyForm(state));
        let errors = 0;
        Object.entries(formData).map((element)=>{
            if(element[1].error){
                errors+=1;
            }
        });

        if(errors <= 0){
            const user = await signIn({...state});
            console.log(user);
            setSuccess(true)
            if(user.code){
                console.log(user.code);
                setUserSubmitError(user.code);
            }
        }
            
        setState(formData);

    }
    const updateField=(name,value)=>{
        setState(state=>({...state,[name]:{...state[name],"value":value}}));
    }

    useEffect(()=>{
        if(userSubmitError){
            if(userSubmitError==CONFIRMATION_EXCEPTION){
                setState({conf_code:{value:'',error:''}});
            }
        }
        
    },[userSubmitError])

    useEffect(()=>{
        if(userSubmitError){
            setNewFormReady(true);
        }
    },[state]);




    return(
        <View style={styles.container}>
            <View style={styles.form}>

                
                {!success &&
                <View>
                    <View>
                        <Text>
                        {state.email.error} 
                        </Text>
                        <TextInput
                                placeholder="Email"
                                name="email"
                                onChangeText={(value)=>updateField('email',value)}
                                style={styles.input}
                        />
                    </View>
                
                
                    <View>
                        <Text>
                            {state.password.error} 
                        </Text>
                        <TextInput
                            placeholder="Password"
                            error={state.password.error}
                            name="password"
                            onChangeText={(value)=>updateField('password',value)}

                            style={styles.input}
                        />
                    </View>
                </View>
                }

                {(userSubmitError && newFormReady) &&
                    <View>
                        <Text>
                            {state.conf_code.error} 
                        </Text>
                        <TextInput
                            placeholder="Confirmation Code"
                            error={state.conf_code.error}
                            name="conf_code"
                            onChangeText={(value)=>updateField('conf_code',value)}
                            value={state.conf_code.value}
                            style={styles.input}
                        />
                    </View>

                }
                <TouchableOpacity 
                     onPress={(userSubmitError && newFormReady) ?submitConfCode :submit}
                     style={styles.button}
                >
                    <Text style={styles.text}>
                        {(userSubmitError && newFormReady) ? "Submit Confirmation!" : "Sign in!"}
                    </Text>
                </TouchableOpacity>
               
            </View>
        </View>
    )
}


export default Signin;

