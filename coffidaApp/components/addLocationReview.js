import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Switch} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocode from "react-geocode";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import {LogBox} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NumberSlider from 'react-native-number-slider'
navigator.geolocation = require('react-native-geolocation-service');
LogBox.ignoreLogs([ 'VirtualizedLists should never be nested']);



const API_KEY = "#########################";
const STORE_EMAIL = '@save_email';
const STORE_PASS = '@save_password';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';
const userCurrLocation = false;


var txtInpHeight = "5%";
var txtInpWidth = "70%";

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



function getLat(latitude){
  return ( "hey lat")
}
function getLongi(longi){

}


function addLocationReview(props){

  const [locName,setLocName] = React.useState('');
  const [locTown,setLocTown] = React.useState('');
  const [locLat,setLocLat] = React.useState ('');
  const [locLong,setLocLong] = React.useState('');
  const [avgOverall,setAvgOverall] = React.useState(0);
  const [avgPrice,setAvgPrice] = React.useState('');
  const [avgQual,setAvgQual] = React.useState ('');
  const [avgClen,setAvgClen] = React.useState('');
  const [desc,setDesc] = React.useState('');
  const [buttonLatText, setLatBtnText] = React.useState('get latitude');
  const [buttonLongiText, setLongiBtnText] = React.useState('get longitude');
  const [overallSlider,setOverallSl] = React.useState(1);
  const [priceSlider,setPriceSl] = React.useState(1);
  const [qualitySlider,setQualitySl] = React.useState(1);
  const [cleanSlider,setCleanSl] = React.useState(1);
  const [showView, setShowView] = React.useState(false);
  const [currID, setCurrID] = React.useState("");


  const buttonPress = async() => {
    const token = await AsyncStorage.getItem(TOKEN);
    const id = await AsyncStorage.getItem(USERID);
    console.log(showView + " show view val");
    if(id == null){
      alert("You need to sign in to make a review")
    //   var locationReview = {
    //     locationName: String(locName),
    //     locationTown: String(locTown),
    //     locationLati: String(locLat),
    //     locationLongi: String(locLong),
    //     locationOverall: String(avgOverall),
    //     locationPrice: String(avgPrice),
    //     locationQual: String(avgQual),
    //     locationClen: String(avgClen),
    //     locationDesc: String(desc)
    //
    // }






}
      else{
      //   var locationReview = {
      //     locationName: String(locName),
      //     locationTown: String(locTown),
      //     locationLati: String(locLat),
      //     locationLongi: String(locLong),
      //     locationOverall: String(avgOverall),
      //     locationPrice: String(avgPrice),
      //     locationQual: String(avgQual),
      //     locationClen: String(avgClen),
      //     locationDesc: String(desc)
      //
      // }

      if(token != null){
        const token = await AsyncStorage.getItem(TOKEN);
        const id = await AsyncStorage.getItem(USERID);
        //const curr_loc_id = await AsyncStorage.getItem(LOCID);
        console.log(token + " IDDDD");
        var str_token = String(token);

          const postReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': str_token}


          }
           fetch('http://10.0.2.2:3333/api/1.0.0/find', postReq)
            .then((response) => response.json())
            .then((responseJson)=>{
              setCurrID(String(responseJson.length))


            })
            .catch((error) => {
              console.log(String(error))
              alert("unable to fetch user")


            })
            // .finally(()=>setLoaded(false));





      }
      else{
        alert("error");
      }

      }//

      if(currID.length != 0){
        var locInt = Number(currID) + 1;
        console.log(locInt + " int");
        var newLOCID = String(locInt);
        AsyncStorage.setItem(LOCID,newLOCID);
        const token = await AsyncStorage.getItem(TOKEN);
        const id = await AsyncStorage.getItem(USERID);
        console.log(token + " IDDDD");
        var str_token = String(token);
      if(token!=null){
        var locDeets = {
          overall_rating: avgOverall,
          price_rating: avgPrice,
          quality_rating: avgQual,
          clenliness_rating:avgClen,
          review_body:desc
        }
        const postReq = {
          method:'POST',
          headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
          body: JSON.stringify(locDeets)


        }
         fetch('http://10.0.2.2:3333/api/1.0.0/location' + newLOCID + 'review', postReq)
          .then((response) => response.json())
          .then((responseJson)=>{

            return responseJson

          })
          .then((data)=>{

          })
          .catch((error) => {
            console.log(String(error))
            alert("unable to fetch user")


          })
        }
        else{
          alert("------")
        }
      }//
}



    // add values to arraySize
    //check if they are EMPTY
    //send alert to user to tell them the field needs to be filled
    //post to API






  const showReviewView = () => {
    setShowView(state => !state)
    txtInpHeight = "5%";
    txtInpWidth = "70%";

  }


  const returnLat = (locName) =>{


    if(String(locName).length == 0){
      alert("please enter a location name");

    }
    else{
      console.log(locName);

    }
  }
  const returnLongi = (locName) =>{
    if(String(locName).length == 0){
      alert("please enter a location name");
    }
    else{

    }

  }
  const getPlaceDetails = (place) =>{
    console.log(place.structured_formatting.main_text);
    console.log('this worksss');

  }
  const setPriceSlider = (value) =>{
    console.log(value + "avg price");
    setPriceSl(value);
    setAvgPrice(value);
  }
  const setQualitySlider = (value) =>{
    console.log(value + "avg qual");
    setQualitySl(value);
    setAvgQual(value);
  }
  const setCleanSlider = (value) =>{
    console.log(value + "avg cleanliness");
    setCleanSl(value);
    setAvgClen(value);
  }
  const setOverallSlider = (value) =>{
    console.log(value + "avg overall");
    setOverallSl(value);
    setAvgOverall(value);
  }


  return(

    <KeyboardAwareScrollView  style={styles.keyboardView} keyboardShouldPersistTaps={'handled'}>

      <View style={styles.viewStyle}>

      <View style={styles.placesView} >

          <GooglePlacesAutocomplete
            placeholder="search"
            onPress={(data,details) => {

              console.log(data)
             const placeName = String(data.structured_formatting.main_text) ;
             console.log(placeName);


             let placeAddr = String(data.structured_formatting.secondary_text);
             let fullLocName = placeName + placeAddr;
             console.log(data.structured_formatting.main_text + " location_id name");
             console.log(String(fullLocName) + " full loc name");
             let cityName = " ";
             Geocode.setApiKey(API_KEY);
             Geocode.fromAddress(String(fullLocName)).then(
               (response) =>{
                 console.log(response.results[0].geometry.location.lat);
                 let arraySize = response.results[0].address_components.length;


                 for(var i =0;i<arraySize;i++){
                   let addrType = response.results[0].address_components[i].types;
                   let typeName = response.results[0].address_components[i].long_name;
                   //console.log(typeName + " typeName");
                   if(addrType.includes("postal_town")||addrType.includes("locality")){
                     console.log(typeName + " postal_town");
                     cityName = String(typeName);
                   }
                   else if(!addrType.includes("postal_town") && !addrType.includes("locality") &&!addrType.includes("postal_town")&&
                   addrType.includes("administrative_area_level_1")){
                     console.log(typeName + " loool ");
                     cityName = String(typeName);
                   }
                   else if(!addrType.includes("postal_town") && !addrType.includes("locality") && !addrType.includes("postal_town")&&
                   !addrType.includes("administrative_area_level_1") &&addrType.includes("administrative_area_level_2") ){
                     console.log(typeName + " loool ");
                     cityName = String(typeName);
                   }
                   else{
                     console.log(typeName + " jjjj");
                   }


                   }




                 setLocLat(response.results[0].geometry.location.lat);
                 setLocLong(response.results[0].geometry.location.lng);
                 console.log(locLong + " LONGGGITUDEEEEEE");
                 setLocTown(cityName);
                 console.log(cityName);
                 setLocName(placeName);
                 console.log(showView + " here show view")
               },
               (error)=>{
                 console.error(error);
               }
             );
            }}
            query={{
              key: API_KEY,
              language: 'en',

            }}
            autoFocus={false}
            fetchDetails={true}
            listViewDisplayed = 'auto'



            onFail={(error) => console.error(error + "errorrrr")}
            currentLocation = {userCurrLocation}


          />

      </View>



      <Text style = {styles.labelStyle}>Location name</Text>
      <TextInput
        label="Location name"
        value = {locName}
        style={[styles.textInputStyle, showView ? styles.textInputStyle : styles.changeTextInputStyle]}
      />
      <Text style = {styles.labelStyle}>Location Town</Text>
      <TextInput
        label="Location town"
        value = {String(locTown)}
        style={[styles.textInputStyle, showView ? styles.textInputStyle : styles.changeTextInputStyle]}
      />

      <Text style={styles.labelStyle}>Latitude:</Text>
      <TextInput
        label="Latitude"
        value = {String(locLat)}
        style={[styles.textInputStyle, showView ? styles.textInputStyle : styles.changeTextInputStyle]}
      />
      <Text style = {styles.labelStyle}>Longitude:</Text>
      <TextInput
        label="Longitude"
        value = {String(locLong)}
        style={[styles.textInputStyle, showView ? styles.textInputStyle : styles.changeTextInputStyle]}
      />
      <View style ={styles.switchView}>
      <Text style={styles.switchViewText}>Add review</Text>
      <Switch
        trackColor={{ false: "#fff", true: "#000" }}
        thumbColor={showView ? "#cd853f" : "#f5dd4b"}
        onValueChange={value => showReviewView(value)}
        value={showView}
        style={styles.switchStyle}
      />

      </View>
      {showView &&
      <View style={styles.addReviewView} >
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
      </View>
    }

      <TouchableOpacity
      style={[styles.btnStyle, showView ? styles.btnStyle : styles.changeButtonStyle]}

      onPress = {() => buttonPress()}
      >
      <Text style = {styles.buttonText}>Add location!</Text>
      </TouchableOpacity>

      </View>

    </KeyboardAwareScrollView>

  )



}

export default addLocationReview;
