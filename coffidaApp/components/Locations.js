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
const USERID = '@save_id';
const LOGGED = '@save_loggedStatus';
const LOCID = '@save_locid'


const styles = StyleSheet.create({
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
  btnStyle:{
    backgroundColor:"#ffefd5",
    borderRadius:10,
    height:'10%',
    width:'70%',
    marginTop:'5%',
    marginBottom:'10%',
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },

  buttonText:{
    color:'#000000',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  }




})

function Locations({navigation}){

  const nav = useNavigation();

const viewReviews = async() =>{
  const currLocID = await AsyncStorage.getItem(LOCID);
  console.log(currLocID + " lool")
  //AsyncStorage.setItem(LOCID,)
  if(currLocID !== null){
  
    nav.navigate('View Reviews');
  }


}
const addReview = async() =>{
  nav.navigate("Add Review")
}
const favLoc = async() =>{

}
const unFavLoc = async() =>{

}



  return(
    <View style={styles.viewStyle}>
    <Text style ={styles.buttonText}>LOCATION:</Text>
    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => addReview()}
    >
    <Text style = {styles.buttonText}>Add review</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => viewReviews()}
    >
    <Text style = {styles.buttonText}>View Reviews</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => favLoc()}
    >
    <Text style = {styles.buttonText}>Fave location</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => unFavLoc()}
    >
    <Text style = {styles.buttonText}>Unfave location</Text>
    </TouchableOpacity>
    </View>

  )
}
export default Locations;
