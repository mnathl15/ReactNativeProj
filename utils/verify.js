import emailRegex from "email-regex";

export const verifyForm = (formData) =>{
    let password;
    
    Object.keys(formData.fields).map((key)=>{
        formData.fields[key]["error"] = '';
        if(!formData.fields[key].value){
           formData.fields[key]["error"] = 'Please fill out this field'
        }
        else{
            switch(key){
                case "email":
                    if(!emailRegex().test(formData.fields[key].value)) {
                        formData.fields[key]={...formData.fields[key],error:'Please enter a valid email'}
                    }
                case "password":
                    password = formData.fields[key].value;
                    if(password.length < 8){
                        formData.fields[key]={...formData.fields[key],error:'Password not long enough'}
                    }
                case "retype_password":
                    if(formData.fields[key].value != password){
                        formData.fields[key]={...formData.fields[key],error:'Password\'s do not match'}
                    }

                    
            }
        }
    })
    
    return JSON.stringify(formData);
}



