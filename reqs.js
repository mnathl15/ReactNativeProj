
import Amplify,{ Auth } from 'aws-amplify';

Amplify.configure({
    Auth:{
        identityPoolId: "us-east-1:b7141a41-abfd-4e04-bd28-915f4b2d7a31",
        region: 'us-east-1', 
        userPoolId: 'us-east-1_71zexM0Mw',
        userPoolWebClientId: '4j9hpgpj64e91213pr4fcaevrb',
    }

    
})


export const signUp = async (state)=>{
    try{
        const [email,password] = [state.email.value,state.password.value];
        const user = await Auth.signUp({
            username:email,
            password:password,
            attributes:{
                email:email
            }
        });
        console.log(user);
        return(user);
    }catch(error){
        console.log(error);
    }
   
    
   
}

export const signIn = async(state)=>{
    try{
        const [email,password] = [state.email.value,state.password.value];

        const user = await Auth.signIn({
            username:email,
            password:password
        });

        console.log(user);
        return user;
    }catch(error){
        return(error);
    }
    
    
}

export const confirmSignUp = async(email,conf_code)=>{
    try{
        const conf = await Auth.confirmSignUp(emaiil,conf_code);
    }
    catch(error){
        console.log(error);
    }
    
}



    



