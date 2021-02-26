import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert,SafeAreaView,FlatList} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useEffect,useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {withNavigation} from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const STORE_FN = '@save_firstname'
const STORE_LN = '@save_lastname'
const STORE_EMAIL = '@save_email'
const STORE_PASS = '@save_password'
const USERID = '@save_id';
const LOGGED = '@save_loggedStatus';
const TOKEN = '@save_token';
const LOCID = '@save_locid'
const CUR_REV = '@save_curr_rev_id';
const PRICE = '@save_price';
const QUAL = '@save_qual';
const CLEAN = '@save_clean';
const OVERALL = '@save_overall';
const DESC = '@save_desc';
const REVLOCID = '@save_curr_loc_id';

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
    justifyContent:'center',
    //justifyContent:'space-around',
    backgroundColor:'#fff'
  },
  buttonText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'#d27535',
    borderRadius:10

  },
  dataLayout:{
    flex:1,
    height:'100%',
    width:'100%',
    backgroundColor:'#d27535'
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


  labelStyle:{
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:20,
    marginTop:'5%'
  },
  btnStyle:{
    width:'70%',
    marginLeft:'15%',
    borderColor: '#000',
    borderRadius:5,
  },

  buttonText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'#d27535'

  },
  dataText:{
    fontSize:20,
    marginTop:'5%'
  },
  locationBtnStyle:{
    width:'100%',
    justifyContent:'center',
    borderColor: '#000',
    borderRadius:5,


  },
  container:{
    justifyContent: 'center',
    backgroundColor:'#fff',
    height:'100%',
    width:'100%',
    justifyContent:'center'
  }




})

function viewUserReviews({navigation}){
//main function
//navigation prop set so other screens can navigate to this one
  const nav = useNavigation();
  const [userReviews,setUserReviews] = React.useState([]);
  const [loaded,setLoaded] = React.useState(false);
  //declare and set state variables
  const ItemSeparatorView = () => {
    return (
      //returns a view between each FlatList item
      <View
          style={{
            height: '0.1%',
            width: '100%',
            marginTop:'10%',
            backgroundColor: '#fff'
          }}
      />
    );
  };


  useFocusEffect(
    //runs when screen comes into focus
    React.useCallback(() => {
    const loadData = async () =>{

      const token = await AsyncStorage.getItem(TOKEN);
      const locid = await AsyncStorage.getItem(LOCID);
      const userid = await AsyncStorage.getItem(USERID);
      //get values needed for api calls from AsyncStorage

      var str_token = String(token);


      if(token != null){
        //execute if token is not null (when the user is logged in)
          const userRevReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
            //force no cache to be stored
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , userRevReq)
            //execute get request to get user's info
            .then((response) => response.json())
            .then((responseJson)=>{
              setUserReviews(responseJson.reviews);
              //get user's reviews and set to state array
              //this array will be used to fill the FlatList with data
              setLoaded(true)
              //load FlatList




            })
            .catch((error) => {
              console.log(String(error))
            //catch error



            })

      }


      else{
        alert("sign in")
        setLoaded(false)
        //if token's null => user hasnt signed in
        //alert user to sign in
        //dont load flatlist

      }
//
    }
    //eof

    //console.log(locReviews.location_id + " data source");
    loadData();


  },[loaded])
  //reload FlatList if loaded value changes
);


const viewReview = (currLocID,revLocID,price,qual,clean,overall,desc) =>{
  //function executed when user presses on review (a FlatList item)
  //reviews details passed as arguments
  AsyncStorage.setItem(REVLOCID,String(currLocID));
  AsyncStorage.setItem(CUR_REV,String(revLocID));
  AsyncStorage.setItem(PRICE,String(price));
  AsyncStorage.setItem(QUAL,String(qual));
  AsyncStorage.setItem(CLEAN,String(clean));
  AsyncStorage.setItem(OVERALL,String(overall));
  AsyncStorage.setItem(DESC,String(desc));
  //save review's details to AsyncStorage
  //so they can be accessed and used in the next screen


  nav.navigate("Update Review")
  //navigate to screen to update review
}





  return(
    <SafeAreaView style={styles.container}>
    {!loaded?(
      <View style={styles.container}>
      <Text> unable to fetch data </Text>
      </View>
    ):(
      <FlatList
        data={userReviews}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({item,index})=>(

        <TouchableOpacity style={styles.btnStyle} onPress={()=>viewReview(String(item.location.location_id),String(item.review.review_id),String(item.review.price_rating),String(item.review.quality_rating),String(item.review.clenliness_rating),
          String(item.review.overall_rating),String(item.review.review_body))}>

         <View style={styles.dataLayout}>


         <Text style={styles.buttonText}>Likes: {item.review.likes}</Text>
         <Text style={styles.buttonText}>Overall rating: {item.review.overall_rating}</Text>
         <Text style={styles.buttonText}>Overall price: {item.review.price_rating}</Text>
         <Text style={styles.buttonText}>Quality rating: {item.review.quality_rating}</Text>
         <Text style={styles.buttonText}>Cleanliness: {item.review.clenliness_rating}</Text>
         <Text style={styles.buttonText}>Review: {item.review.review_body}</Text>
         </View>
        </TouchableOpacity>

          )}
          keyExtractor={(item,index) => item.review.review_id.toString()}
          extraData = {userReviews}
        />
    )}

    </SafeAreaView>
  )
};
export default viewUserReviews;
