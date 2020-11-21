import emailRegex from "email-regex";

export const verifyForm = (formData) =>{
    let password;
    
    Object.keys(formData).map((key)=>{
        formData[key]["error"] = '';
        if(!formData[key].value){
           formData[key]["error"] = 'Please fill out this field'
        }
        else{
            switch(key){
                case "email":
                    if(!emailRegex().test(formData[key].value)) {
                        formData[key]={...formData[key],error:'Please enter a valid email'}
                    }
                case "password":
                    password = formData[key].value;
                    if(password.length < 8){
                        formData[key]={...formData[key],error:'Password not long enough'}
                    }
                case "retype_password":
                    if(formData[key].value != password){
                        formData[key]={...formData[key],error:'Password\'s do not match'}
                    }

                    
            }
        }
    })
    
    return JSON.stringify(formData);
}



