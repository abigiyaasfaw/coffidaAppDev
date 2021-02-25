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
var error_Str= "";


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

//https://10.0.2.2:3333/api/1.0.0/user
//10.0.2.2:3333
//switch to /user
//https://virtserver.swaggerhub.com/zedrem/CoffiDa/1.0.0
function SaveUserData(firstName,lastName,email,password, boolX){
  console.log("reached #1");

   console.log("reached?")
   try{

      AsyncStorage.setItem(STORE_EMAIL,email)
      AsyncStorage.setItem(STORE_PASS,password)
     console.log('Data saved!!')
   }catch(e){

     alert('Failed to save data :(')
   }




};

function getUserData(){

}
function navToLogIn(props){
  //const navigation = useNavigation();





}


function buttonPress(firstName,lastName,email,password)  {


  let validUser = false;
  var emailRegex = /\S+@\S+\.\S+/;
  var noEmptyFields = false;
  var validEmail = false;
  var validPass = false;
  const fN_str = String(firstName);
  const lN_str = String(lastName);
  const email_str = String(email);
  const pass_str = String(password);
  var count = 0;
  var error_string = "";
  var usrParams = [fN_str,lN_str,email_str,pass_str];
  for(var i=0;i<usrParams.length;i++){
    if(usrParams[i].length === 0){
      count += 1;
      //check if any of the fields are empty and increment count
    }
  }
  console.log(count +  " countttt");

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
      //check length of PASSWORD
      if(pass_str.length <= 5){
        validPass = false;


      }
      else{
        validPass = true;
      }
    }
    else{
      validEmail = false;

    }


  }
  if(validEmail == false && validPass == false && noEmptyFields == false){
    alert("make sure the email is in a valid format and your password is longer than 5 characters and that"
    + "you have filled all the fields")

  }
  if(validEmail == true && validPass == false && noEmptyFields == true) {
    alert("password has to be longer than three characters!")
  }
  if(validEmail == false && validPass == true && noEmptyFields == true) {
    alert("make sure the email is in the right format")
  }
  if(validEmail == false && validPass == false && noEmptyFields == true) {
    alert("invalid email format and password should be longer than 5 characters")
  }



  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // console.log(password)
  //const [userAdded, getUserAdded] = React.useState(false);
  var errorExists = false;
  var userExists = false;
  if(validEmail == true && validPass == true && noEmptyFields == true){

    var userDeets = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    const postReq = {
      method:'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify(userDeets)
      //'first_name='+ firstName + '&last_name=' + lastName + '&email='+ email + '&password='+ password
    }


    fetch('http://10.0.2.2:3333/api/1.0.0/user', postReq)
      .then((response) => {
        console.log(response + " response");
        if(response.ok){
          navToLogIn();
          return response.JSON();


        }
        else{
          alert("email may already exist. please try with a different email")
          throw new Error("oppps");
        }
      })
      .then((responseJson) => {

        console.log(responseJson);
        return responseJson;



      })
      .then(data => console.log(data.id))
      .catch((error) => {
        console.log(String(error))
          //validUser = false
          //alert("email may already exist. please try with a different email")
      })
      console.log(validUser + " valid user status")

      if(validUser == true){
          console.log(validUser + " valid user status in {}")

      }
      // fetch('http://10.0.2.2:3333/api/1.0.0/user/1')
      //   .then((response) => response.json())
      //   .catch((error) => {
      //     console.log(error + " get error");
      //   })




  }






}


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


  const print = async() =>{
    const state = await AsyncStorage.getItem('Users')
    console.log(password);
    //navigation.navigate('Log in');

    var emailRegex = /\S+@\S+\.\S+/;
    var noEmptyFields = false;
    var validEmail = false;
    var validPass = false;
    const fN_str = String(firstName);
    const lN_str = String(lastName);
    const email_str = String(email);
    const pass_str = String(password);
    var count = 0;
    var error_string = "";
    var usrParams = [fN_str,lN_str,email_str,pass_str];
    for(var i=0;i<usrParams.length;i++){
      if(usrParams[i].length === 0){
        count += 1;
        //check if any of the fields are empty and increment count
      }
    }
    console.log(count +  " countttt");

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
        //check length of PASSWORD
        if(pass_str.length <= 5){
          validPass = false;


        }
        else{
          validPass = true;
        }
      }
      else{
        validEmail = false;

      }


    }
    if(validEmail == false && validPass == false && noEmptyFields == false){
      alert("make sure the email is in a valid format and your password is longer than 5 characters and that"
      + "you have filled all the fields")

    }
    if(validEmail == true && validPass == false && noEmptyFields == true) {
      alert("password has to be longer than three characters!")
    }
    if(validEmail == false && validPass == true && noEmptyFields == true) {
      alert("make sure the email is in the right format")
    }
    if(validEmail == false && validPass == false && noEmptyFields == true) {
      alert("invalid email format and password should be longer than 5 characters")
    }



    // console.log(firstName)
    // console.log(lastName)
    // console.log(email)
    // console.log(password)
    //const [userAdded, getUserAdded] = React.useState(false);
    var errorExists = false;
    var userExists = false;
    if(validEmail == true && validPass == true && noEmptyFields == true){

      var userDeets = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      }
      const postReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(userDeets)
        //'first_name='+ firstName + '&last_name=' + lastName + '&email='+ email + '&password='+ password
      }


      fetch('http://10.0.2.2:3333/api/1.0.0/user', postReq)
        .then((response) => {
          if(response.ok){
            console.log(response + " response");

            try{

                AsyncStorage.setItem(STORE_EMAIL,email)
                AsyncStorage.setItem(STORE_PASS,password)
                navigation.navigate('Log in');

               alert('Data saved!!')
               return response.json();
             }catch(e){
               alert('Failed to save data :(')
             }




          }
          else{
            alert("email may already exist. please try with a different email")
          }
        })
        .then((responseJson) => {

          console.log(responseJson);
          return responseJson;

  

        })
        .then((data) => {
          console.log(data.id)
          setDataId(data.id);
          var dataID = String(data.id);
          var newUser = {
            id: dataID,
            fName: String(firstName),
            lName: String(lastName),
            email: String(email),
            password: String(password)
          }
          try{

            AsyncStorage.getItem('users')
            .then((users) => {
              const addNewUser = users ? JSON.parse(users) : [];
              addNewUser.push(newUser);
              AsyncStorage.setItem('users', JSON.stringify(addNewUser));
            });


          }catch{
            console.log("noppppee")
          }

        })
        .catch((error) => {
          console.log(String(error))
          alert("email may already exist. please try with a different email")

        })



        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');




    }



  }


  return (
    // const saveData = async () =>{
    //   console.log("reached?")
    //   try{
    //     await AsyncStorage.setItem(STORE_FN,firstName)
    //     await AsyncStorage.setItem(STORE_LN,lastName)
    //     await AsyncStorage.setItem(STORE_EMAIL,email)
    //     await AsyncStorage.setItem(STORE_PASS,password)
    //     alert('Data saved!!')
    //   }catch(e){
    //     alert('Failed to save data :(')
    //   }
    // }


  // <ScrollView contentContainerStyle={styles.contentContainer}
  //   >
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
    onPress = {() =>print()}
  >
    <Text style = {styles.buttonText}>Sign me up!</Text>
  </TouchableOpacity>
  </View>
  </KeyboardAwareScrollView>
  // </ScrollView>

  );

}


// const readData = async() =>{
//   try{
//     const saved_fn = await AsyncStorage.getItem(STORE_FN)
//     const saved_ln = await AsyncStorage.getItem(STORE_LN)
//     const saved_email = await AsyncStorage.getItem(STORE_EMAIL)
//     const saved_pass = await AsyncStorage.getItem(STORE_PASS)
//
//     if (saved_fn !== null){
//       setFirstName(saved_fn)
//     }
//     if (saved_ln !== null){
//       setLastName(saved_ln)
//     }
//     if (saved_email !== null){
//       setEmail(saved_email)
//     }
//     if (saved_pass !== null){
//       setPassword(saved_pass)
//     }
//   } catch(e){
//     alert('Failed to fetch the data')
//   }
// }
//
// useEffect(()=>{
//   readData()
// },[])

export default SignUp;
