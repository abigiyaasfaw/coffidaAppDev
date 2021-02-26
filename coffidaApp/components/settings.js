import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert,Switch} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

const STORE_EMAIL = '@save_email';
const STORE_PASS = '@save_password';
const FNAME = '@save_fn';
const LNAME = '@save_ln';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOGGED = '@save_loggedStatus';
const LOCID = '@save_locid'
const PROFANITY = '@save_filter';
//variables to set/get items using async storage


const  styles = StyleSheet.create({
  textInputStyle:{
    height:'10%',
    width:'70%',
    borderColor: "#ffffff",
    borderWidth:1,
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
  updateUserBtn:{
    backgroundColor:"#ffefd5",
    borderRadius:5,
    height:'10%',
    width:'70%',
    marginTop:'5%',
    justifyContent:'center',
    flex:1,
    marginBottom:'4%'
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
    marginTop:'5%'
  },
  keyboardView:{
    flex:1,
    height:'100%',
    width:'100%',
    backgroundColor:'#cd853f'
  },
  switchView:{
    backgroundColor:'#cd853f',
    width:'100%',
    height:'100%',
    flexDirection:'row',
    flex:2,
    justifyContent:'center'
  }

});











 function settings(props){
  let validate = false;
  const navigation = useNavigation();



  const[firstName,setFirstName] = React.useState('');
  const[lastName,setLastName] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [profFilter, setProfFilter] = React.useState(false);
  const [loaded,setLoaded] = React.useState(false)
  useFocusEffect(
    //when screen is focused
  React.useCallback(()=>{
    const getCurrUserDetails = async() =>{
      const userID = await AsyncStorage.getItem(USERID);
      const token = await AsyncStorage.getItem(TOKEN);
      const userPass = await AsyncStorage.getItem(STORE_PASS)
      //load saved relevant variables from async storage
      const userReq = {
        method:'GET',
        headers:{ 'Content-Type': 'application/json', 'X-Authorization': String(token)},


      }
      //get request to retrieve the user's information
      fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userID), userReq)
        .then((response) => {
          if(response.ok){
            //if response is okay
            //load view

            return response.json();
            setLoaded(true)


          }
          else{
            alert("YOU NEED TO LOGIN")
            setLoaded(false);


          }
        })
        .then((responseJson) => {

          console.log(responseJson.password);
          setFirstName(responseJson.first_name);
          setLastName(responseJson.last_name);
          setEmail(responseJson.email);
          setPassword(String(userPass));

          //get user's details
          //set it to state variables




        })

        .catch((error) => {
          console.log(String(error))
          alert("YOU NEED TO LOGIN TO VIEW SETTINGS DUH??")
          setLoaded(false);
          //warn user
          //dont load view

        })




    }
    getCurrUserDetails();

  },[loaded])
  //loaded => dependency variable
  //if loaded changes, useFocusEffect runs again
)


// const profanitySetting = () =>{
//   //method exec
//
//   if(profFilter == false){
//     console.log("setting to true")
//     setProfFilter(profFilter => !profFilter)
//
//   }
//   else if(profFilter == true ){
//     console.log("setting to false")
//     setProfFilter(profFilter => !profFilter)
//     console.log(profFilter + " t")
//   }
//
//
// }

const updateUser = async() =>{
  //method executed when update button is pressed
  var emailRegex = /\S+@\S+\.\S+/;
  //regex used to validate email

  if(firstName != null && lastName != null && email != null && password != null){
    //run if block if none of the fields are empty
    if(emailRegex.test(String(email)) == true && password.length > 5){
      //check if email is valid AND the password is > 5
    const userID = await AsyncStorage.getItem(USERID);
    const token = await AsyncStorage.getItem(TOKEN)
    //load variables needed to make a request
    var userDeets ={
      first_name : String(firstName),
      last_name : String(lastName),
      email: String(email),
      password: String(password)
    }
    //create user array to use in fetch body

    const userUpdateReq = {
      method:'PATCH',
      headers:{ 'Content-Type': 'application/json','X-Authorization': String(token)},
      body:JSON.stringify(userDeets)
      //convert onject to json string


    }
     fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userID) , userUpdateReq)
     //make patch request to update user
      .then((response) => {
        if(response.ok){
          AsyncStorage.setItem(FNAME,String(firstName));
          AsyncStorage.setItem(LNAME,String(lastName));
          AsyncStorage.setItem(STORE_EMAIL,String(email));
          AsyncStorage.setItem(STORE_PASS,String(password));
          //if patch request successful, store user details in storage

          alert("updated user")

          //notify user
          nav.goBack();
          //go back to the previous screen
        }
        else{
          alert("unable to update user")
          //notify user if error occurs
        }
        return response.json()
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(error + " e")
        if(String(error).includes("\"Bad\"")){
          alert("Email already in use")
          //check if error is 'Bad Request'
          //notify user that the email has been taken
        }



      })
    }
    else{
      alert("please make sure the email format is valid and your password is longer than 5 characters");
      //if email and password are wrongly entered, notify user
    }
  }

  else{
    alert("Make sure no fields are empty!!")
    //alert user that the description cant be empty
  }
}







  return(


    <KeyboardAwareScrollView  style={styles.keyboardView} >
  {loaded?
    <View style={styles.viewStyle}>
    <Text style={styles.buttonText}>LOGIN</Text>
    </View>
    :
    <View style={styles.viewStyle}>

    <Text style = {styles.labelStyle}>First Name: </Text>
    <TextInput
      label="First Name:"
      onChangeText = {text=>setFirstName(text)}
      value = {firstName}
      style={styles.textInputStyle}

    />
    <Text style = {styles.labelStyle}>Last Name:</Text>
    <TextInput
      label="Last Name:"
      onChangeText = {text=>setLastName(text)}
      value = {lastName}
      style={styles.textInputStyle}
    />
    <Text style = {styles.labelStyle}>Email:</Text>
    <TextInput
      label="Email"
      onChangeText = {text=>setEmail(text)}
      value = {email}
      style={styles.textInputStyle}

    />
    <Text style = {styles.labelStyle}>Password: </Text>
    <TextInput
      label="Password"
      onChangeText = {text=>setPassword(text)}
      value = {password}
      style={styles.textInputStyle}
    />

    <TouchableOpacity
    style={styles.updateUserBtn}
    onPress = {()=>updateUser()}
    >

    <Text style = {styles.buttonText}>Update Details</Text>


    </TouchableOpacity>
    <Text style={styles.buttonText}>PROFANITY FILTER</Text>
    <View style={styles.switchView}>
    <Text style={styles.buttonText}>OFF</Text>
    <Switch
        trackColor={{ true: "#000", false: "#fff" }}
        thumbColor={profFilter ? "#fff" : "#000"}
        onValueChange={(profFilter)=>{
          setProfFilter(profFilter)
          console.log(String(profFilter))
          AsyncStorage.setItem(PROFANITY,String(profFilter))
        }}
        value={profFilter}
      />
      <Text style={styles.buttonText}>ON</Text>
      </View>



  </View>
}
  </KeyboardAwareScrollView>
  )
}
export default settings;
