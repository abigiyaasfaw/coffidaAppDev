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
  imageStyle:{
    width:'5%',
    height:'5%'
  },
  imageView:{
    width:'50%',
    height:'50%',
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
      const str_token = String(token);

      console.log(priceCurrRev + " price")
      setAvgOverall(String(overallCurrRev));
      setAvgPrice(String(priceCurrRev));
      setAvgQual(String(qualCurrRev));
      setAvgClen(String(cleanCurrRev));
      setDesc(String(descCurrRev))
      console.log(revLocId + " rev loc id");
      console.log(revID + " rev id");
      setOverallSl(Number(overallCurrRev));
      setPriceSl(Number(priceCurrRev));
      setQualitySl(Number(qualCurrRev));
      setCleanSl(Number(cleanCurrRev));
      const checkPhotoExistsReq = {
        method:'GET',
        headers:{ 'Accept': 'image/png','X-Authorization': str_token},




      }
        fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) + '/photo', checkPhotoExistsReq)
        .then((response) => {
          console.log(response)
          if(response.status == 404 ){
            //setLiked(false);
            setPhotoChosen(false);
            setPhotoRequest(false);
            setPhotoUri(null);
            setAlreadyHadPhoto(false)

          }
          if(response.status == 200){
            //console.log(response.uri + " j")
            //./storage/photos/2.png
            setPhotoChosen(true);
            setPhotoRequest(true);
            setAlreadyHadPhoto(true)
            setPhotoUri(response.url);
            console.log( response + ' photo uri???//')

            return response;

          }
        })
        .then((image)=>{
          console.log(image!=null + " lool")


        })
        .catch((error) => {
          console.log(String(error))
          alert("ERROR!!")
          setPhotoChosen(false);
          setPhotoRequest(false);


        })




    }
    getRevDetails();

  },[])
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
  const deleteReview = async() =>{
    const revLocId = await AsyncStorage.getItem(REVLOCID);
    const revID = await AsyncStorage.getItem(CUR_REV);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);



    var reviewDeets ={
      overall_rating: Number(avgOverall),
      price_rating: Number(avgPrice),
      quality_rating: Number(avgQual),
      clenliness_rating: Number(avgClen),
      review_body:String(desc)
    }

    const reviewReq = {
      method:'DELETE',
      headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) , reviewReq)
      .then((response) => {
        if(response.ok){
          alert("deleted review!")

          setGoBack(true);
          nav.goBack();
        }
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(String(error))
        alert("unable to delete review")
        setGoBack(false);


      })

  }
  const updateReviewFunc = async() =>{
    const revLocId = await AsyncStorage.getItem(REVLOCID);
    const revID = await AsyncStorage.getItem(CUR_REV);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);
    console.log(avgQual + avgClen + avgClen + avgPrice + avgOverall + desc);
    console.log(typeof avgQual)
    if(desc.length !== 0){
    var reviewDeets ={
      overall_rating: Number(avgOverall),
      price_rating: Number(avgPrice),
      quality_rating: Number(avgQual),
      clenliness_rating: Number(avgClen),
      review_body:String(desc)
    }

    const reviewReq = {
      method:'PATCH',
      headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
      body:JSON.stringify(reviewDeets)


    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) , reviewReq)
      .then((response) => {
        if(response.ok){
          alert("updated review!")
          if(photoChosen != true){
            nav.goBack();
          }


        }
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(String(error))
        alert("unable to add review")
        setGoBack(false);


      })
      console.log(photoUri + " photo uri")
      if(photoChosen == true && photoUri.length != 0){
        console.log(picData + " pic data")
        const addPhotoReq = {
          method:'POST',
          headers:{ 'Accept':'*/*','Content-Type': 'image/jpeg','X-Authorization': str_token},
          body:photoUri



        }
         fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) + '/photo', addPhotoReq)
          .then((response) => {
            if(response.ok ){
              console.log(response.uri + " res")
              setGoBack(true);
              nav.goBack();


            }
            else{
              console.log(response + " res")
            }

          })
          .then((responseJson)=>{



          })
          .catch((error) => {
            console.log(String(error))
            alert("ERROR!!")


          })





      }


}
else{
  alert("fill out description please!!")
}


    //nav.navigate("Update Review")
  }
  const addPhoto = () =>{
    ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 500,
          maxWidth: 500,
        },
        (response) => {
          console.log(response.uri == null)
          if(response.uri == null){
            setPhotoChosen(false)
            setPhotoRequest(false)
            setPhotoUri(null)
          }
          else{
          setPhotoUri(response.uri);


          console.log(response.base64 + " base")
          setPhotoChosen(true)
          setPhotoRequest(true)

        }
        }
      )
  }
  const deletePhoto = async() =>{
    const revLocId = await AsyncStorage.getItem(REVLOCID);
    const revID = await AsyncStorage.getItem(CUR_REV);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);
    if(alreadyHadPhoto == true){
      const addPhotoReq = {
        method:'DELETE',
        headers:{ 'Accept':'*/*','Content-Type': 'image/jpeg','X-Authorization': str_token},




      }
       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(revLocId) + '/review/' + String(revID) + '/photo', addPhotoReq)
        .then((response) => {
          if(response.ok ){
            alert("photo deleted")

            setPhotoChosen(false)
            setPhotoRequest(false)

          }


        })
        .then((responseJson)=>{



        })
        .catch((error) => {
          console.log(String(error))
          alert("ERROR!!")


        })

    }
    else{
      setPhotoChosen(false)
      setPhotoRequest(false)
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
    {photoChosen?

      <Image
      source={{
            uri:  String(photoUri)
          }}
          style={styles.imageStyle}
        />

        :
        null


    }
    {photoRequest?


        <TouchableOpacity
        style={styles.btnStyle}

        onPress = {() => {
          deletePhoto()

        }}
        >
        <Text style = {styles.buttonText}>Delete photo</Text>
        </TouchableOpacity>


      :

      <TouchableOpacity
      style={styles.btnStyle}

      onPress = {()=>
        addPhoto()
      }
      >
      <Text style = {styles.buttonText}>Add photo</Text>
      </TouchableOpacity>

    }
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
