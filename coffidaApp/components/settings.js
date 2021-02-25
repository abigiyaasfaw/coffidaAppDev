import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert,Switch} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'

const STORE_EMAIL = '@save_email';
const STORE_PASS = '@save_password';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOGGED = '@save_loggedStatus';
const LOCID = '@save_locid'
const PROFANITY = '@save_filter';


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
    flex:1
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
  showText:{
    fontWeight:'bold',
    fontSize:20,
    justifyContent:'center',
    marginTop: '10%'
  },
  hideText:{
    display:'none'
  }
});


//   const AsyncAlert = (title, msg) => new Promise((resolve) => {
//   Alert.alert(
//     title,
//     msg,
//     [
//       {
//         text: 'ok',
//         onPress: () => {
//           resolve('YES');
//         },
//       },
//     ],
//     { cancelable: false },
//   );
// });








 function settings(props){
  let validate = false;
  const navigation = useNavigation();



  const[firstName,setFirstName] = React.useState('');
  const[lastName,setLastName] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [profFilter, setProfFilter] = React.useState(false);
  useEffect(()=>{
    const getCurrUserDetails = async() =>{
      const userID = await AsyncStorage.getItem(USERID);
      const token = await AsyncStorage.getItem(TOKEN);
      const userPass = await AsyncStorage.getItem(STORE_PASS)
      const userReq = {
        method:'GET',
        headers:{ 'Content-Type': 'application/json', 'X-Authorization': String(token)},


      }
      fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userID), userReq)
        .then((response) => {
          if(response.ok){


            return response.json();



          }
          else{
            alert("YOU NEED TO LOGIN")
          }
        })
        .then((responseJson) => {

          console.log(responseJson.password);
          setFirstName(responseJson.first_name);
          setLastName(responseJson.last_name);
          setEmail(responseJson.email);
          setPassword(String(userPass));
          console.log(userPass)



        })

        .catch((error) => {
          console.log(String(error))
          alert("YOU NEED TO LOGIN TO VIEW SETTINGS DUH??")

        })




    }
    getCurrUserDetails();

  },[])


const profanitySetting = () =>{
  console.log(profFilter + " begin")
  if(profFilter == false){
    console.log("setting to true")
    setProfFilter(profFilter => !profFilter)

  }
  else if(profFilter == true ){
    console.log("setting to false")
    setProfFilter(profFilter => !profFilter)
    console.log(profFilter + " t")
  }
  console.log(profFilter + " after")

}

const updateUser = async() =>{
  var emailRegex = /\S+@\S+\.\S+/;

  if(firstName != null && lastName != null && email != null && password != null){
    if(emailRegex.test(String(email)) == true && password.length > 5){
    const userID = await AsyncStorage.getItem(USERID);
    const token = await AsyncStorage.getItem(TOKEN)
    var userDeets ={
      first_name : String(firstName),
      last_name : String(lastName),
      email: String(email),
      password: String(password)
    }

    const userUpdateReq = {
      method:'PATCH',
      headers:{ 'Content-Type': 'application/json','X-Authorization': String(token)},
      body:JSON.stringify(userDeets)


    }
     fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userID) , userUpdateReq)
      .then((response) => {
        if(response.ok){
          alert("updated user")


          nav.goBack();
        }
        else{

        }
        return response.json()
      })
      .then((responseJson)=>{
        console.log(responseJson)


      })
      .catch((error) => {
        console.log(error + " e")
        if(String(error).includes("\"Bad\"")){
          alert("Email already in use")
        }



      })
    }
    else{
      alert("please make sure the email format is valid and your password is longer than 5 characters");
    }
  }

  else{
    alert("Make sure no fields are empty!!")
  }
}







  return(


    <KeyboardAwareScrollView  style={styles.keyboardView} >
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



  </View>
  </KeyboardAwareScrollView>
  )
}
export default settings;
