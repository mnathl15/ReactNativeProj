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

const Signup=({user,setUser})=>{

    var [formData,setFormData] = useState({
        fields:{
            email:{value:'',error:''},
            name:{value:'',error:''},
            password:{value:'',error:''},
            retype_password:{value:'',error:''},
            bday:{value:'06-19-1997',error:''}
        },
        formNum:1
    });

   
    const [newFormReady, setNewFormReady] = useState(false);
    const [awsError,setAwsError] = useState();
    

   

    const submit = async ()=>{
        formData = JSON.parse(verifyForm(formData));
        let formErrors = 0;
        Object.entries(formData.fields).map((element)=>{
            if(element[1].error){
                formErrors+=1;
            }
        });

        if(formErrors <= 0){
            if(formData.formNum==2){
                const conf = await confirmSignUp(user.username,formData.fields.conf_code.value);
            }
            else{
                const user = await signUp({...formData.fields});

                if(user.code){
                    setAwsError(user.code);
                    return;
                }


                setUser(user.user);
            }
            return;
        }
            
        setFormData(formData);
        
    }

    // On success of field change the state to only handle the confirmation code form. 
    // Have to make sure both the success and new state is ready before we load new form
    
    useEffect(()=>{
        try{
            if(user.user){
                setFormData({fields:{conf_code:{value:'',error:''}},formNum:2});
            }
        }catch(error){
            console.log(error);
       }
    },[user]);


    useEffect(()=>{
        
        if(!newFormReady && formData.formNum==2){
            setNewFormReady(true);
        }
    },[formData]);


    const updateField=(name,value)=>{
        setFormData({
                fields:{...formData.fields,[name]:{...formData.fields[name],"value":value}},
                formNum:formData.formNum
        })
    }


    

    return(
        <View style={styles.container}>
            <View style={styles.form}>

                
                {(formData.formNum ==1) && 
                <View>
                    <View>
                        <Text>
                        {formData.fields.email.error} 
                        </Text>
                        <TextInput
                                placeholder="Email"
                                name="email"
                                onChangeText={(value)=>updateField('email',value)}
                                value={formData.fields.email.value}
                                style={styles.input}
                        />
                    </View>
                
                    <View>
                        <Text>
                        {formData.fields.name.error} 
                        </Text>
                        <TextInput
                                placeholder="Name"
                                name="name"
                                error={formData.fields.name.error}
                                onChangeText={(value)=>updateField('name',value)}
                                value={formData.fields.name.value}
                                style={styles.input}
                        /> 
                    </View>
                    <View>
                        <Text>
                            {formData.fields.password.error} 
                        </Text>
                        <TextInput
                            placeholder="Password"
                            name="password"
                            onChangeText={(value)=>updateField('password',value)}
                            value={formData.fields.password.value}
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text>
                            {formData.fields.retype_password.error} 
                        </Text>
                        <TextInput
                            placeholder="Retype Password"
                            name="retype_password"
                            onChangeText={(value)=>updateField('retype_password',value)}
                            value={formData.fields.retype_password.value}
                            style={styles.input}
                        />
                    </View>
                </View>
}
                {(formData.formNum==2 && newFormReady) &&
                    <View>
                        <Text>
                            {formData.fields.conf_code.error} 
                        </Text>
                        <TextInput
                            placeholder="Confirmation Code"
                            name="conf_code"
                            onChangeText={(value)=>updateField('conf_code',value)}
                            value={formData.fields.conf_code.value}
                            style={styles.input}
                        />
                    </View>
                }
                
                <TouchableOpacity 
                     onPress={submit}
                     style={styles.button}
                >
                    <Text style={styles.text}>
                    {(formData.formNum==2 && newFormReady) ? "Submit Confirmation!" : "Join!"}
                    </Text>
                </TouchableOpacity>
               
            </View>
        </View>
    )
}


export default Signup;

