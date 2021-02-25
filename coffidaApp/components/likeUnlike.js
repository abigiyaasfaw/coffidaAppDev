import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {useState,useEffect,useLayoutEffect} from "react";
import { View, Text, StyleSheet,Button,FlatList,SafeAreaView,TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import Dialog from "react-native-dialog";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import {ListItem} from 'native-base';

const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';
const CUR_REV = '@save_curr_rev_id';
const REV_ID = '@save_rev_id';
const STATE = '@save_state';



const  styles = StyleSheet.create({
  textInputStyle:{
    height:"5%",
    width:"70%",
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
  btnStyle:{
    backgroundColor:"#ffefd5",
    borderRadius:20,
    height:'60%',
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
  placesView:{
    marginTop:'5%',
    flex:1,
    height:'100%',
    width:'70%',
    backgroundColor:'#fff'
  },
  errorText:{
    color:'#000'
  },
  sliderView:{
    flex:2,
    flexDirection:'row'
  },
  addReviewView:{
    width:'100%',
    height:'100%',
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    //justifyContent:'space-around',
    backgroundColor:'#cd853f'

  },
  addDescStyle:{
    height:'10%',
    width:'70%',
    borderColor: "#ffffff",
    borderWidth:1,
    //marginTop:'10%',
    backgroundColor:"#ffffff",
    color:"#000"
  },
  switchStyle:{
    transform:[{ scaleX: 1.0 }, { scaleY: 1.0 }]
  },
  switchView:{
    flex:1,
    flexDirection:'row',
    marginTop:'5%',
    alignItems:'center'
  },
  switchViewText:{
    alignItems:'center',
    fontWeight:'bold',
    fontSize:20
  },
  changeTextInputStyle:{
    height:'10%',
    width:'70%'
  },
  changeButtonStyle:{
    backgroundColor:"#ffefd5",
    borderRadius:10,
    height:'30%',
    width:'70%',
    marginTop:'1%',
    marginBottom:'5%',
    justifyContent:'center',
    alignItems:'center',
    flex:1

  },
  newPlacesView:{
    marginTop:'10%',
    flex:1,
    height:'100%',
    width:'70%',
    backgroundColor:'#fff'
  }
})






function likeUnlike(props){
 const [likedStatus,setLikedStatus] = React.useState(false)
 const [btnText,setBtnText] = React.useState(" ")
 const [loaded, setLoaded] = React.useState(false);
 const [userLiked,setUserLiked] = React.useState([])
 const [userLocLiked,setUserLocLiked] = React.useState([]);
 const nav = useNavigation();


useEffect(()=>{
  const loadLikes = async() =>{
    const token = await AsyncStorage.getItem(TOKEN);
    //const locid = await AsyncStorage.getItem(LOCID);
    const revID = await AsyncStorage.getItem(REV_ID);
   const loc_id = await AsyncStorage.getItem(LOCID);
   const userid = await AsyncStorage.getItem(USERID);
   const status = await AsyncStorage.getItem(STATE);
   if(status == "TRUE"){
     console.log("yeah")
     setLikedStatus(true)
     setLoaded(true)
   }
   else{
     console.log("no")
     setLikedStatus(false)
     setLoaded(true)
   }

   console.log(token + " tokenn")

  }
  loadLikes();
  console.log(likedStatus + " liked status?")


},[loaded])




const changeLikeStatus = async() =>{
  const token = await AsyncStorage.getItem(TOKEN);
  //const locid = await AsyncStorage.getItem(LOCID);
  const revID = await AsyncStorage.getItem(REV_ID);
 const loc_id = await AsyncStorage.getItem(LOCID);
 const userid = await AsyncStorage.getItem(USERID);
 const status = await AsyncStorage.getItem(STATE);
  if(likedStatus == true){
    console.log( " like ");
    const likeReviewReq = {
      method:'DELETE',
      headers:{ 'Content-Type': 'application/json','X-Authorization': String(token)},



    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(loc_id) + '/review/' + String(revID) + '/like', likeReviewReq)
      .then((response) => {
        if(response.ok){
            setLikedStatus(false);
            setBtnText("Unlike")
            //nav.goBack();


        }
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(String(error))
        alert("unable to unlike review")


      })

  }
  else{
    console.log(" unliked ")
    const unLikeReviewReq = {
      method:'POST',
      headers:{ 'Content-Type': 'application/json','X-Authorization': String(token)},



    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(loc_id) + '/review/' + String(revID) + '/like', unLikeReviewReq)
      .then((response) => {
        if(response.ok){
          setLikedStatus(true)
          setBtnText("Like")
          //nav.goBack();



        }
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(String(error))
        alert("unable to unlike review")


      })
  }
}










  return(
    <KeyboardAwareScrollView  style={styles.keyboardView} >

{loaded?(

  <View style={styles.viewStyle}>
  <TouchableOpacity
  style={styles.signUpBtn}
  onPress = {()=>changeLikeStatus()}
  >

  {likedStatus?<Text style = {styles.buttonText}>Unlike</Text>
  :
  <Text style = {styles.buttonText}>Like</Text>

}
  </TouchableOpacity>
  </View>
):(

  <Text>Unable to fetch data</Text>

)

}








  </KeyboardAwareScrollView>



  )
}

export default likeUnlike;
