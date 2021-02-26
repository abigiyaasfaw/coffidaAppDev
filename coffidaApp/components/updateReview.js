import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';
import {Image} from 'react-native' ;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocode from "react-geocode";
import NumberSlider from 'react-native-number-slider';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import {useState,useEffect} from "react";
import { useFocusEffect } from '@react-navigation/native';
const STORE_EMAIL = '@save_email';
const STORE_PASS = '@save_password';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';
const CUR_REV = '@save_curr_rev_id';
const PRICE = '@save_price';
const QUAL = '@save_qual';
const CLEAN = '@save_clean';
const OVERALL = '@save_overall';
const DESC = '@save_desc';
const REVLOCID = '@save_curr_loc_id';
const PROFANITY = '@save_filter';
import * as ImagePicker from 'react-native-image-picker';

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
    marginTop:'2%',
    marginBottom:'15%',
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
  delBtn:{
    width:'70%',
    marginTop:'1%'

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
  imageStyle:{
    width:'20%',
    height:'5%'
  },
  imageView:{
    width:'50%',
    height:'10%',
    flex:1
  }
})

function updateReview(props){

  const [avgOverall,setAvgOverall] = React.useState('');
  const [avgPrice,setAvgPrice] = React.useState('');
  const [avgQual,setAvgQual] = React.useState ('');
  const [avgClen,setAvgClen] = React.useState('');
  const [desc,setDesc] = React.useState('');
  const [overallSlider,setOverallSl] = React.useState(1);
  const [priceSlider,setPriceSl] = React.useState(1);
  const [qualitySlider,setQualitySl] = React.useState(1);
  const [cleanSlider,setCleanSl] = React.useState(1);
  const [goBack,setGoBack] = React.useState(false);
  const [photoRequest, setPhotoRequest] = React.useState(false)
  const[photoBtnText,setPhotoBtnText] = React.useState("");
  const [photoUri,setPhotoUri] = React.useState("");
  const [photoChosen,setPhotoChosen] = React.useState(false)
  const[picData,setPicData] = React.useState([]);
  const[alreadyHadPhoto,setAlreadyHadPhoto] = React.useState(false);
  const [res,setRes] = React.useState([]);
  const nav = useNavigation();


  useEffect(()=>{
    const getRevDetails = async() =>{
      const revLocId = await AsyncStorage.getItem(REVLOCID);
      const revID = await AsyncStorage.getItem(CUR_REV);
      const priceCurrRev = await AsyncStorage.getItem(PRICE);
      const qualCurrRev = await AsyncStorage.getItem(QUAL);
      const cleanCurrRev = await AsyncStorage.getItem(CLEAN);
      const overallCurrRev = await AsyncStorage.getItem(OVERALL);
      const descCurrRev = await AsyncStorage.getItem(DESC);
      const token = await AsyncStorage.getItem(TOKEN);
      //get current review's details from storage
      //get user's token to make an api call
      //these were set before the navigation to this page
      const str_token = String(token);

      console.log(priceCurrRev + " price")
      setAvgOverall(String(overallCurrRev));
      setAvgPrice(String(priceCurrRev));
      setAvgQual(String(qualCurrRev));
      setAvgClen(String(cleanCurrRev));
      setDesc(String(descCurrRev))
      setOverallSl(Number(overallCurrRev));
      setPriceSl(Number(priceCurrRev));
      setQualitySl(Number(qualCurrRev));
      setCleanSl(Number(cleanCurrRev));
      //set the state variables to the values from storage
      //this fills the text inputs and number sliders with the review's current details when the screen is loaded





    }
    getRevDetails();

  },[])

  const setPriceSlider = (value) =>{
    //method to get value that user selects for price and sets a state variable to value
    setPriceSl(value);
    setAvgPrice(value);
  }
  const setQualitySlider = (value) =>{
    //method to get value that user selects for quality and sets a state variable to value
    setQualitySl(value);
    setAvgQual(value);
  }
  const setCleanSlider = (value) =>{
  //method to get value that user selects for clean and sets a state variable to value
    setCleanSl(value);
    setAvgClen(value);
  }
  const setOverallSlider = (value) =>{
  //method to get value that user selects for overall and sets a state variable to value
    setOverallSl(value);
    setAvgOverall(value);
  }
  const deleteReview = async() =>{
    //method to delete a review
    const revLocId = await AsyncStorage.getItem(REVLOCID);
    const revID = await AsyncStorage.getItem(CUR_REV);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);
    //load variables needed to delete a review from storage



    // var reviewDeets ={
    //   overall_rating: Number(avgOverall),
    //   price_rating: Number(avgPrice),
    //   quality_rating: Number(avgQual),
    //   clenliness_rating: Number(avgClen),
    //   review_body:String(desc)
    // }
    // //object array created to

    const reviewReq = {
      method:'DELETE',
      headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
      //headers needed to make a delete request



    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) , reviewReq)
     //make a delete request for this review
      .then((response) => {
        if(response.ok){
          alert("deleted review!")
          //if request is successful, alert user
          setGoBack(true);
          nav.goBack();
          //navigate back to the previous screen
        }
      })
      
      .catch((error) => {
        console.log(String(error))
        alert("unable to delete review")
        setGoBack(false);
        //notify user if review cant be deleted


      })

  }
  const updateReviewFunc = async() =>{
    //method to update review
    //method invoked when update review button is pressed
    const revLocId = await AsyncStorage.getItem(REVLOCID);
    const revID = await AsyncStorage.getItem(CUR_REV);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);
    //retrieve relevant values to pass to the fetch url
    const profFilter = await AsyncStorage.getItem(PROFANITY);
    //retrieve value of whether has switched on profanity filter or not


    if(desc.length !== 0){
      //check description is not null
      let containsProf = desc.includes("cake")||desc.includes("cakes")||desc.includes("pastry")||desc.includes("pastries")||desc.includes("tea")||desc.includes("teas");
      //check to see if description contains any 'profanity'
     if(String(profFilter) == "true" && containsProf == false || String(profFilter) == "false" && (containsProf == true || containsProf == false)){
       //check if profanity filter is on and check to see if desc includes profanity
       //evaulates to true if profFilter is on but desc has no profanity
       //or if profFilter is off but either the desc contains profanity or not
    var reviewDeets ={
      overall_rating: Number(avgOverall),
      price_rating: Number(avgPrice),
      quality_rating: Number(avgQual),
      clenliness_rating: Number(avgClen),
      review_body:String(desc)
    }
    //create object array of the review details

    const reviewReq = {
      method:'PATCH',
      headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
      body:JSON.stringify(reviewDeets)
      //convert object array to json string


    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) , reviewReq)
     //make patch request to update review
      .then((response) => {
        if(response.ok){
          alert("updated review!")
          //if request is successful, notify user
            nav.goBack();
            //return to previous screen




        }
      })

      .catch((error) => {
        console.log(String(error))
        alert("unable to add review")
        setGoBack(false);
        //notify user of error if review cant be updated


      })


}
else{
  alert("profanity filter is on so make sure you dont add reviews about cakes, tea or pastries!")
  //if desc contains any profanity and filter is on, notify user
}

}
else{
  alert("fill out description please!!")
  //notify user that description is empty
}



  }


return (
  <KeyboardAwareScrollView  style={styles.keyboardView} keyboardShouldPersistTaps={'handled'}>
    <View style={styles.viewStyle}>

    <Text style = {styles.labelStyle}>Average price</Text>
    <NumberSlider
    onValueChange={setPriceSlider}
    value={priceSlider}
    width={300}
    displayValues= {[1, 2, 3, 4, 5]}
    fontSize={15}
    containerBackground='#fff'
    selectedBackground='#000'
  />
    <Text style = {styles.labelStyle}>Average quality: </Text>

    <NumberSlider
    onValueChange={setQualitySlider}
    value={qualitySlider}
    width={300}
    displayValues= {[1, 2, 3, 4, 5]}
    fontSize={15}
    containerBackground='#fff'
    selectedBackground='#000'
  />
    <Text style = {styles.labelStyle}>Average cleanliness </Text>
    <NumberSlider
    onValueChange={setCleanSlider}
    value={cleanSlider}
    width={300}
    displayValues= {[1, 2, 3, 4, 5]}
    fontSize={15}
    containerBackground='#fff'
    selectedBackground='#000'
  />
    <Text style = {styles.labelStyle}>Average overall quality </Text>
    <NumberSlider
    onValueChange={setOverallSlider}
    value={overallSlider}
    width={300}
    displayValues= {[1, 2, 3, 4, 5]}
    fontSize={15}
    containerBackground='#fff'
    selectedBackground='#000'
  />
    <Text style = {styles.labelStyle}>Description </Text>
    <TextInput
      label="desc"
      onChangeText = {text=>setDesc(text)}
      value = {desc}
      style={styles.addDescStyle}
      maxLength={140}
    />


    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => updateReviewFunc()}
    >
    <Text style = {styles.buttonText}>Update Review!</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.btnStyle}

    onPress = {() => deleteReview()}
    >
    <Text style = {styles.buttonText}>Delete review</Text>
    </TouchableOpacity>


    </View>

  </KeyboardAwareScrollView>
)









}
export default updateReview;
