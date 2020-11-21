import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import {confirmSignUp, signUp} from "../reqs.js";
import { Authenticator, SignIn } from 'aws-amplify-react-native';
import { verifyForm } from '../utils/verify.js';



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

const Signup=()=>{

    const [formData,setFormData] = useState({
        email:{value:'',error:''},
        name:{value:'',error:''},
        password:{value:'',error:''},
        retype_password:{value:'',error:''},
        bday:{value:'06-19-1997',error:''}

    });

   
    const [newFormReady, setNewFormReady] = useState(false);
    const [formSuccess,setFormSuccess] = useState(false);


    const submitConfCode = ()=>{
        confirmSignUp()
    }

    const submit = async ()=>{
        formData = JSON.parse(verifyForm(formData));
        let formErrors = 0;
        Object.entries(formData).map((element)=>{
            if(element[1].error){
                formErrors+=1;
            }
        });

        if(formErrors <= 0){
            if(formSuccess){
                const conf = await confirmSignUp(formData.email.value,conf_code);
            }
            else{
                const user = await signUp({...formData});
            }
            setSuccess(true);
            setNewFormReady
            return;
        }
            
        setFormData(formData);
        
    }

    // On success of field change the state to only handle the confirmation code form. 
    // Have to make sure both the success and new state is ready before we load new form
    
    useEffect(()=>{
        if(formSuccess){
            setFormData({conf_code:{value:'',error:''}});
        }
        
    },[success])

    useEffect(()=>{
        if(formSuccess){
            setNewFormReady(true);
        }
    },[formData]);


    const updateField=(name,value)=>{
        setFormData(state=>({...state,[name]:{...state[name],"value":value}}));
    }


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
                                value={formData.email.value}
                                style={styles.input}
                        />
                    </View>
                
                    <View>
                        <Text>
                        {formData.name.error} 
                        </Text>
                        <TextInput
                                placeholder="Name"
                                name="name"
                                error={state.name.error}
                                onChangeText={(value)=>updateField('name',value)}
                                value={state.name.value}
                                style={styles.input}
                        /> 
                    </View>
                    <View>
                        <Text>
                            {formData.password.error} 
                        </Text>
                        <TextInput
                            placeholder="Password"
                            name="password"
                            onChangeText={(value)=>updateField('password',value)}
                            value={formData.password.value}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text>
                            {formData.retype_password.error} 
                        </Text>
                        <TextInput
                            placeholder="Retype Password"
                            name="retype_password"
                            onChangeText={(value)=>updateField('retype_password',value)}
                            value={formData.retype_password.value}
                            style={styles.input}
                        />
                    </View>
                </View>
}
                {(formSuccess && newFormReady) &&
                    <View>
                        <Text>
                            {formData.conf_code.error} 
                        </Text>
                        <TextInput
                            placeholder="Confirmation Code"
                            name="conf_code"
                            onChangeText={(value)=>updateField('conf_code',value)}
                            value={formData.conf_code.value}
                            style={styles.input}
                        />
                    </View>
                }
                
                <TouchableOpacity 
                     onPress={(formSuccess && newFormReady) ?submitConfCode :submit}
                     style={styles.button}
                >
                    <Text style={styles.text}>
                    {(formSuccess && newFormReady) ? "Submit Confirmation!" : "Join!"}
                    </Text>
                </TouchableOpacity>
               
            </View>
        </View>
    )
}


export default Signup;

