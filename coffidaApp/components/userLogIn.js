import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert} from 'react-native';
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
const FNAME = '@save_fn';
const LNAME = '@save_ln';
//variables to set and get items from AsyncStorage
var userExists = false;

const  styles = StyleSheet.create({
  //style sheet
  textInputStyle:{
    height:'15%',
    width:'70%',
    borderColor: "#ffffff",
    borderWidth:1,
    backgroundColor:"#ffffff",
    color:"#cd853f"

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
    width:'70%',
    marginTop:'5%',
    marginBottom:'10%',
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





function checkData(username,password){
  //function to check if email and password is valid when logging in
  const usernameStr = String(username);
  const passStr = String(password);
  let exists = false;

  if(usernameStr.length == 0  || passStr.length == 0){
    alert("OH NO one of the fields are empty");
    exists = false;


  }
  if(usernameStr.length && passStr.length !== 0){
    checkUserExists(username,password);
    //if fields are filled
    //pass email and password to function to check if the user details exists
    exists = true;
  }

}




 function userLogIn(props){
   //main function of the class
   //props argument for navigation
  let validate = false;
  const navigation = useNavigation();
  //navigation holds the navigation prop



  const [username,setUserName] = React.useState('');
  const [password,setPassword] = React.useState('');
  //set up state variable

  const UserSignUp = async() => {
    //sign up button invokes this method
    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)
    const emAS = await AsyncStorage.getItem(STORE_EMAIL)
    const passAS = await AsyncStorage.getItem(STORE_PASS)
    const userArr = await AsyncStorage.getItem('users');
    //load and store values stored in AsyncStorage



    if(idAS == null && tokenAS == null){
      //check if token and user id stored in AsyncStorage is empty
      //if empty, this means no one has signed in yet
      navigation.navigate('Sign up')
    }
    else{
      alert("user already log in")
      //if token and id stored in async is not empty
      //this means user has already signed in
      //notify user
    }
  };



  const logOut = async() =>{
    //method to log out user
//method runs when log out button is pressed


    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)
    const emAS = await AsyncStorage.getItem(STORE_EMAIL)
    const passAS = await AsyncStorage.getItem(STORE_PASS)
    //get user's email and password, token and id from storage


    if(tokenAS == null){
      //checks if token is null
      //if block runs if user is not logged in (as token is empty)
      AsyncStorage.setItem(USERID,"");
      AsyncStorage.setItem(TOKEN,"");
      AsyncStorage.setItem(STORE_EMAIL,"");
      AsyncStorage.setItem(STORE_PASS,"");
      AsyncStorage.setItem(LOGGED,"");
      //clear all values stored in storage since no one's logged in
      //just as a precaution
      alert("you need to first sign in to be able to log out!")
      //notify user
      navigation.navigate('Home');
      //send user back to home

    }
    else{
      //else block executes if token is not null (user is logged in)
      let stringID = String(idAS);
      let stringToken = String(tokenAS);


      const postReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json','X-Authorization':stringToken}


      }
      fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', postReq)
      //post request to log out user
        .then((response) => {
          if(response.ok){

            AsyncStorage.setItem(USERID,"");
            AsyncStorage.setItem(TOKEN,"");
            AsyncStorage.setItem(STORE_EMAIL,"");
            AsyncStorage.setItem(STORE_PASS,"");
            AsyncStorage.setItem(LOGGED,"");
            navigation.navigate('Home');
            //if request successful set all items in storage to empty strings
            //so actions such as viewing reviews and liking and favouriting cant be done
            //since user has logged out
            //these pages rely on a token and user id so wont load if not provided with one






          }
          else{
            alert("Log out unsuccesful")
            //notify user if request returns anything other than 200
          }
        })

        .catch((error) => {
          console.log(String(error))
          alert("unable to logout user")
          //notify user if error thrown

        })
    }


  }
  const checkUserExists = async() => {
    //method to check if user user exists when trying to log in
    //once email and password provided arent empty
    const saved_email = await AsyncStorage.getItem(STORE_EMAIL)
    const saved_pass = await AsyncStorage.getItem(STORE_PASS)
    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)
    //get values from AsyncStorage

    var saved_email_str = String(saved_email);
    var saved_pass_str = String(saved_pass);


    var usernameStr = String(username);
    var passStr = String(password);

    if(usernameStr.length == 0 && passStr.length ==0){
      alert('sorry but you neeed to enter your username and password');
      //just as a precaution
      //double check password and email arent empty
    }
    if(tokenAS != null){
      alert("User already logged in")
      //if token stored isnt empty
      //notify user that they've already logged in
      //since tokens are cleared when there's been a log out
    }
    else{
      //execute this block if no one has logged in
          // var exists = false;
          // for(var i=0;i<parsed.length;i++){
          //   var emailArr = String(parsed[i].email);
          //   var passwordArr = String(parsed[i].password);
          //   console.log(emailArr +  " email")
          //   console.log(usernameStr + " user var")
          //   if(usernameStr == emailArr && passStr == passwordArr){
          //     console.log (" match")
          //     exists = true;
          //
          //
          //
          //   }
          // }
          // console.log(exists + " exists here")

            // console.log("it's true")
            // console.log(usernameStr + " user var outside for")
            var userLogin = {
              email: usernameStr,
              password: passStr
            }
            //object array to pass to fetch request
            const postReq = {
              method:'POST',
              //post request to sign in a user
              headers:{ 'Content-Type': 'application/json'},
              body: JSON.stringify(userLogin)
              //change object array to json string to be used in request

            }
            fetch('http://10.0.2.2:3333/api/1.0.0/user/login', postReq)
            //execute fetch request
              .then((response) => {
                if(response.ok){
                  //execute if request is successful


                    return response.json();
                    //if request successful return response




                }
                else{
                  alert("Invalid email/password")
                }
              })
              .then((responseJson) => {

                console.log(responseJson);
                return responseJson;
                //return json response



              })
              .then((data) => {



                if(tokenAS == null && idAS == null){
                  AsyncStorage.setItem(TOKEN,String(data.token))
                  AsyncStorage.setItem(USERID,String(data.id))
                  AsyncStorage.setItem(LOGGED,"true")
                  AsyncStorage.setItem(STORE_PASS,String(passStr))
                  AsyncStorage.setItem(STORE_EMAIL,String(usernameStr))
                  navigation.navigate('Home');
                  //get token and user id and save them to storage
                  //these values will be used throughout the app
                  //to make reviews,like and favourite

                }
                else{
                  console.log("ALREADY LOG IN")
                  //if token is not empty
                  //user has already logged in
                  //notify user
                }






              })
              .catch((error) => {
                console.log(String(error))
                alert("unable to login user")
                //catch error
                //notify user that there's an error

              })


          }

          setUserName('');
          setPassword('');
          //set username and password values to empty
          //so email and password text inputs are cleared on the login page
          //prevents another login when user accidentally presses login when they've already logged in 

    }






  return(
    <KeyboardAwareScrollView  style={styles.keyboardView} >
    <View style={styles.viewStyle}>
    <Text style = {styles.labelStyle}>Enter username </Text>
    <TextInput
      label="Enter username"
      onChangeText= {(text)=>setUserName(text)}
      value = {username}
      style={styles.textInputStyle}
    />
    <Text style = {styles.labelStyle}>Enter password: </Text>
    <TextInput
      label="Enter password"
      onChangeText = {(text)=>setPassword(text)}
      value = {String(password)}
      style={styles.textInputStyle}
    />
    <TouchableOpacity
    style={styles.signUpBtn}
    onPress = {() => checkUserExists()}
  >

    <Text style = {styles.buttonText}>LOG IN</Text>


</TouchableOpacity>
    <TouchableOpacity
    style={styles.signUpBtn}
    onPress = {UserSignUp}
    >

    <Text style = {styles.buttonText}>SIGN UP</Text>


    </TouchableOpacity>
    <TouchableOpacity
    style={styles.signUpBtn}
    onPress = {logOut}
    >

    <Text style = {styles.buttonText}>SIGN OUT</Text>


    </TouchableOpacity>



  </View>
  </KeyboardAwareScrollView>
  )
}
export default userLogIn;
