import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geocode from "react-geocode";
import NumberSlider from 'react-native-number-slider';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
const STORE_EMAIL = '@save_email';
const STORE_PASS = '@save_password';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';



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
  },
  imageView:{
    flex:1,
    height:'50%',
    width:'50%',
    alignItems:'center'
  }
})


function buttonPress(locName,locTown,locLat,locLong,avgOverall,avgPrice,avgQual,avgClen,desc){

}
function getLat(latitude){
  return ( "hey lat")
}
function getLongi(longi){

}


function addReview(props){

  const [locName,setLocName] = React.useState('');
  const [locTown,setLocTown] = React.useState('');
  const [locLat,setLocLat] = React.useState ('');
  const [locLong,setLocLong] = React.useState('');
  const [avgOverall,setAvgOverall] = React.useState('');
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
  const [locData, setLocData] = React.useState([]);
  const [photoRequest, setPhotoRequest] = React.useState(false)
  const[photoBtnText,setPhotoBtnText] = React.useState("");
  const [photoUri,setPhotoUri] = React.useState("");
  const [photoChosen,setPhotoChosen] = React.useState(false)
  const nav = useNavigation();


  const [revID, setRevID] = React.useState("");
  const [goBack,setGoBack] = React.useState(false);







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
  const getLocName = () =>{

  }
  const addReviewFunc = async()  =>{
    const locid = await AsyncStorage.getItem(LOCID);
    const userid = await AsyncStorage.getItem(USERID);
    const userarr = await AsyncStorage.getItem('users');
    const arrParsed = JSON.parse(userarr);
    const token = await AsyncStorage.getItem(TOKEN);
    const str_token = String(token);
    const str_locid = String(locid)

    if(desc.length !== 0){
    var reviewDeets ={
      overall_rating: avgOverall,
      price_rating: avgPrice,
      quality_rating: avgQual,
      clenliness_rating: avgClen,
      review_body:String(desc)
    }

    const reviewReq = {
      method:'POST',
      headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
      body:JSON.stringify(reviewDeets)


    }
     fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_locid + '/review', reviewReq)
      .then((response) => {
        if(response.ok){
          //alert("added review!")
          setGoBack(true);
          nav.goBack();
        }
      })
      .then((responseJson)=>{



      })
      .catch((error) => {
        console.log(String(error))
        alert("unable to add review")
        setGoBack(false);


      })
      if(photoChosen == true ){

        const reviewReq = {
          method:'POST',
          headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
          body:JSON.stringify(photoUri)


        }
         fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_locid + '/review', reviewReq)
          .then((response) => {
            if(response.ok){
              //alert("added review!")
              setGoBack(true);
              nav.goBack();
            }
          })
          .then((responseJson)=>{



          })
          .catch((error) => {
            console.log(String(error))
            alert("unable to add review")
            setGoBack(false);


          })

      }


}
else{
  alert("fill out description please!!")
}
  if(goBack == false){

  }
  else{

    console.log(goBack);
    nav.goBack();
  }
  }//eof




  return(

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

      onPress = {() => addReviewFunc()}
      >
      <Text style = {styles.buttonText}>Add Review!</Text>
      </TouchableOpacity>




      </View>

    </KeyboardAwareScrollView>

  )
}
export default addReview;
