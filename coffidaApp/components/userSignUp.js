import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useEffect,useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {withNavigation} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';


const STORE_FN = '@save_firstname'
const STORE_LN = '@save_lastname'
const STORE_EMAIL = '@save_email'
const STORE_PASS = '@save_password'
//variables used to access and set values in AsyncStorage
let error_Str= "";


const  styles = StyleSheet.create({
  textInputStyle:{
    height:'8%',
    width:'70%',
    borderColor: "#ffffff",
    borderWidth:1,
    //marginTop:'10%',
    backgroundColor:"#ffffff",
    color:"#cd853f"
    //text starts from top left on text input
  },
  isFocused:{
    height:'20%'
  },
  contentContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#cd853f',
    flex:1
  },
  viewStyle:{
    height:'100%',
    width:'100%',
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    //justifyContent:'space-around',
    backgroundColor:'#cd853f'
  },
  signUpBtn:{
    backgroundColor:"#ffefd5",
    borderRadius:5,
    height:'10%',
    width:'60%',
    marginTop:'5%',
    justifyContent:'center'
  },

  buttonText:{
    color:'#000000',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  labelStyle:{
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:20,
    marginTop:'10%'
  },
  keyboardView:{
    flex:1,
    height:'100%',
    width:'100%',
    backgroundColor:'#cd853f'
  }
});





// function navToLogIn(props){
//   //const navigation = useNavigation();
//
//
//
//
//
// }





const postUser = (firstName,lastName,email,password) =>{

  try{
     // AsyncStorage.setItem(STORE_FN,firstName)
     // AsyncStorage.setItem(STORE_LN,lastName)
     // AsyncStorage.setItem(STORE_EMAIL,email)
     // AsyncStorage.setItem(STORE_PASS,password)
    console.log('Data saved!!')
    //alert("successful sign up!!")
    //const nav = useNavigation();

  }catch(e){

    //alert('Failed to save data :(')
  }

}

const addUser = (firstName,lastName,email,password) => {

}
 function SignUp (props){

  const navigation = useNavigation();
  const UserSignUp = () => navigation.navigate('Log in');
  const [firstName,setFirstName] = React.useState('');
  const [lastName,setLastName] = React.useState('');
  const [email,setEmail] = React.useState ('');
  const [password,setPassword] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [dataId, setDataId] = React.useState(0);


  const signUp = async() =>{
    //method executes when sign up button pressed
    let emailRegex = /\S+@\S+\.\S+/;
    //regex to validate email
    let noEmptyFields = false;
    let validEmail = false;
    let validPass = false;
    const fN_str = String(firstName);
    const lN_str = String(lastName);
    const email_str = String(email);
    const pass_str = String(password);
    //convert text input values to string
    let count = 0;
    let error_string = "";
    let usrParams = [fN_str,lN_str,email_str,pass_str];
    for(let i=0;i<usrParams.length;i++){
      if(usrParams[i].length === 0){
        count += 1;
        //check if any of the fields are empty and increment count
      }
    }


    if(count > 0){
      //if count is more than 0, that means at least one of the fields are EMPTY

      noEmptyFields = false;
      //cant pass this unless fields are filled
    }
    else{
      noEmptyFields = true;
      //check if email format is valid using regex
      if(emailRegex.test(email_str) == true){
        validEmail = true;

        if(pass_str.length <= 5){
          //check length of PASSWORD
          //if password length is < 5
          validPass = false;
          //set bool to false


        }
        else{
          validPass = true;
          //set to true if password > 5
        }
      }
      else{
        validEmail = false;
        //set to false if email is invalid

      }


    }
    if(validEmail == false && validPass == false && noEmptyFields == false){
      alert("make sure the email is in a valid format and your password is longer than 5 characters and that"
      + "you have filled all the fields")
      //if all fields are empty, notify user

    }
    if(validEmail == true && validPass == false && noEmptyFields == true) {
      alert("password has to be longer than three characters!")
      //if password is invalid, notify user
    }
    if(validEmail == false && validPass == true && noEmptyFields == true) {
      alert("make sure the email is in the right format")
      //if email is invalid, notify user
    }
    if(validEmail == false && validPass == false && noEmptyFields == true) {
      alert("invalid email format and password should be longer than 5 characters")
      //if only email and password are invalid, notify user
    }




    let errorExists = false;
    let userExists = false;
    if(validEmail == true && validPass == true && noEmptyFields == true){
      //checks to see if email and password are valid AND there's no empty fields


      let userDeets = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
      //create object array of user's details
      const postReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(userDeets)
        //convert object array to json string
        //since content type is json
        //headers and body prepared before post request


      }


      fetch('http://10.0.2.2:3333/api/1.0.0/user', postReq)
      //execute post request
        .then((response) => {
          if(response.ok){
            //check to see if response is successful

            try{


                navigation.navigate('Log in');
                //go to log in screen
               alert('User signed up!!')
               //notify user that they've signed up


             }catch(e){
               alert('Failed to sign up user :(')
               //notify user of error
             }




          }
          else{
            if(response.status == 500){
              alert("server error")
            }
            else{
              alert("email may already exist. please try with a different email")
              //since all fields are checked and server error checked, if request isnt successful
              //the only error is if the email already exists
              //notify user
            }

          }
        })
        .catch((error) => {
          console.log(String(error))


        })



        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setPassword('');




    }



  }


  return (


    <KeyboardAwareScrollView  style={styles.keyboardView} >
    <View style={styles.viewStyle}>
    <Text style = {styles.labelStyle}>Enter your first name: </Text>
    <TextInput
      label="Enter first name"
      onChangeText = {text=>setFirstName(text)}
      value = {firstName}
      style={styles.textInputStyle}

    />
    <Text style = {styles.labelStyle}>Enter your last name: </Text>
    <TextInput
      label="Enter last name"
      onChangeText = {text=>setLastName(text)}
      value = {lastName}
      style={styles.textInputStyle}
    />
    <Text style = {styles.labelStyle}>Enter email: </Text>
    <TextInput
      label="Enter email"
      onChangeText = {text=>setEmail(text)}
      value = {email}
      style={styles.textInputStyle}
    />
    <Text style = {styles.labelStyle}>Enter password: </Text>
    <TextInput
      label="Enter password"
      onChangeText = {text=>setPassword(text)}
      value = {password}
      style={styles.textInputStyle}
    />
    <TouchableOpacity
    style={styles.signUpBtn}
    onPress = {() =>signUp()}
  >
    <Text style = {styles.buttonText}>Sign me up!</Text>
  </TouchableOpacity>
  </View>
  </KeyboardAwareScrollView>


  );

}




export default SignUp;
