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
var userExists = false;

const  styles = StyleSheet.create({
  textInputStyle:{
    height:'15%',
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



function checkData(username,password){
  const usernameStr = String(username);
  const passStr = String(password);
  let exists = false;
  if(usernameStr.length == 0){
    console.log("EMPTY USERNAME " + username);
      }
  if(passStr.length == 0){
    console.log("EMPTY PASSWORD" + password);
  }
  if(usernameStr.length == 0  && passStr.length == 0){
    //console.log("OH NOOOOO USR & PASS EMPTY");
    exists = false;

    //alert('Sorry you need to enter an username and a password');
    AsyncAlert();
  }
  if(usernameStr.length && passStr.length !== 0){
    checkUserExists(username,password);
    exists = true;
  }

}

// function checkUserExists(username,password){
//   const saved_email = AsyncStorage.getItem(STORE_EMAIL)
//   const saved_pass = AsyncStorage.getItem(STORE_PASS)
//   const usernameStr = String(username);
//   const passStr = String(password);
//   if(usernameStr.length == 0 && passStr.length ==0){
//     alert('sorry but you neeed to enter your username and password');
//   }
//
//   try{
//     if (saved_email !== null ){
//
//     }
//     if (saved_pass !== null){
//       const password = JSON.parse(saved_pass);
//       console.log(password.name);
//
//     }
//   } catch(e){
//     console.log('Failed to fetch the data');
//   }
//
//
//
//
//
//
// }


 function userLogIn(props){
  let validate = false;
  const navigation = useNavigation();




  const [username,setUserName] = React.useState('');
  const [password,setPassword] = React.useState('');

  const UserSignUp = async() => {
    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)
    const emAS = await AsyncStorage.getItem(STORE_EMAIL)
    const passAS = await AsyncStorage.getItem(STORE_PASS)
    const userArr = await AsyncStorage.getItem('users');
    const arr = JSON.parse(userArr);
    console.log(arr[0])
    console.log(arr.length)

    if(idAS == null && tokenAS == null){
      navigation.navigate('Sign up')
    }
    else{
      alert("user already log in")
    }
  };



  const logOut = async() =>{



    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)
    const emAS = await AsyncStorage.getItem(STORE_EMAIL)
    const passAS = await AsyncStorage.getItem(STORE_PASS)


    if(tokenAS == null){
      AsyncStorage.setItem(USERID,"");
      AsyncStorage.setItem(TOKEN,"");
      AsyncStorage.setItem(STORE_EMAIL,"");
      AsyncStorage.setItem(STORE_PASS,"");
      AsyncStorage.setItem(LOGGED,"");
      alert("you need to first sign in to be able to log out")
      navigation.navigate('Home');

    }
    else{
      var stringID = String(idAS);
      var stringToken = String(tokenAS);


      const postReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json','X-Authorization':stringToken}


      }
      fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', postReq)
        .then((response) => {
          if(response.ok){
            console.log(response + " response");
            AsyncStorage.setItem(USERID,"");
            AsyncStorage.setItem(TOKEN,"");
            AsyncStorage.setItem(STORE_EMAIL,"");
            AsyncStorage.setItem(STORE_PASS,"");
            AsyncStorage.setItem(LOGGED,"");
            navigation.navigate('Home');







          }
          else{
            alert("USER ALREADY LOGGED OUT")
          }
        })

        .catch((error) => {
          console.log(String(error))
          alert("unable to logout user")

        })
    }


  }
  const checkUserExists = async() => {
    const saved_email = await AsyncStorage.getItem(STORE_EMAIL)
    const saved_pass = await AsyncStorage.getItem(STORE_PASS)
    const arrays =  await AsyncStorage.getItem('users');
    const parsed = JSON.parse(arrays);
    const idAS = await AsyncStorage.getItem(USERID)
    const tokenAS = await AsyncStorage.getItem(TOKEN)

    var saved_email_str = String(saved_email);
    var saved_pass_str = String(saved_pass);

    console.log(parsed);
    console.log(String(saved_email) + " EMAIL")
    console.log(String(saved_pass) + " PASSWORD")
    var usernameStr = String(username);
    var passStr = String(password);
    console.log(usernameStr.length)
    if(usernameStr.length == 0 && passStr.length ==0){
      alert('sorry but you neeed to enter your username and password');
    }
    if(tokenAS != null){
      alert("User already logged in")
    }
    else{
          var exists = false;
          for(var i=0;i<parsed.length;i++){
            var emailArr = String(parsed[i].email);
            var passwordArr = String(parsed[i].password);
            console.log(emailArr +  " email")
            console.log(usernameStr + " user var")
            if(usernameStr == emailArr && passStr == passwordArr){
              console.log (" match")
              exists = true;



            }
          }
          console.log(exists + " exists here")

            console.log("it's true")
            console.log(usernameStr + " user var outside for")
            var userLogin = {
              email: usernameStr,
              password: passStr
            }
            const postReq = {
              method:'POST',
              headers:{ 'Content-Type': 'application/json'},
              body: JSON.stringify(userLogin)

            }
            fetch('http://10.0.2.2:3333/api/1.0.0/user/login', postReq)
              .then((response) => {
                if(response.ok){
                  console.log(response + " response");


                    return response.json();





                }
                else{
                  alert("Enter email and password")
                }
              })
              .then((responseJson) => {

                console.log(responseJson);
                return responseJson;



              })
              .then((data) => {
                console.log(data.token + " token")


                //alert("SUCCESS");

                console.log(tokenAS +  " prev  token")
                console.log(String(data.token) + " curr token")
                console.log(idAS +  " prev  id")
                console.log(String(data.id) + " curr id")
                if(tokenAS == null && idAS == null){
                  AsyncStorage.setItem(TOKEN,String(data.token))
                  AsyncStorage.setItem(USERID,String(data.id))
                  AsyncStorage.setItem(LOGGED,"true")
                  AsyncStorage.setItem(STORE_PASS,String(passStr))
                  AsyncStorage.setItem(STORE_EMAIL,String(usernameStr))
                  navigation.navigate('Home');

                }
                else{
                  console.log("ALREADY LOG IN")
                }






              })
              .catch((error) => {
                console.log(String(error))
                alert("unable to login user")

              })


          }

          setUserName('');
          setPassword('');

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
