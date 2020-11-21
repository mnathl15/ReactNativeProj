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

    const [formData,setFormData] = useState({
        email:{value:'',error:''},
        password:{value:'',error:''},
    });
    const [userSubmitError,setUserSubmitError] = useState("");
    const [formSuccess,setSuccess] = useState(false);
    const [newFormReady, setNewFormReady] = useState(false);
    const [user,setUser] = useState({});
    
    const submit = async ()=>{
        const formData = JSON.parse(verifyForm(formData));
        let errors = 0;
        Object.entries(formData).map((element)=>{
            if(element[1].error){
                errors+=1;
            }
        });

        if(errors <= 0){
            const user = await signIn({...formData});
            setUser(user);
            // setSuccess(true)
            if(user.code){
                console.log(user.code);
                setUserSubmitError(user.code);
            }
        }
            
        setFormData(formData);

    }
    const updateField=(name,value)=>{
        setFormData(formData=>({...formData,[name]:{...formData[name],"value":value}}));
    }

    useEffect(()=>{
        try{
            if(user.code==CONFIRMATION_EXCEPTION){
                setFormData({conf_code:{value:'',error:''}});
            }
        }catch(error){
            console.log(error);
        }

        
    },[user])

    useEffect(()=>{
        if(user){
            setNewFormReady(true);
        }
    },[formData]);




    return(
        <View style={styles.container}>
            <View style={styles.form}>

                
                {!formSuccess &&
                <View>
                    <View>
                        <Text>
                        {formData.email.error} 
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
                            {formData.password.error} 
                        </Text>
                        <TextInput
                            placeholder="Password"
                            error={formData.password.error}
                            name="password"
                            onChangeText={(value)=>updateField('password',value)}

                            style={styles.input}
                        />
                    </View>
                </View>
                }

                {(user && newFormReady) &&
                    <View>
                        <Text>
                            {formData.conf_code.error} 
                        </Text>
                        <TextInput
                            placeholder="Confirmation Code"
                            error={formData.conf_code.error}
                            name="conf_code"
                            onChangeText={(value)=>updateField('conf_code',value)}
                            value={formData.conf_code.value}
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

