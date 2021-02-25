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
    height:'100%',
    width:'100%',
    marginTop:'5%',
    marginLeft:'5%',
    flex:1
  },

  buttonText:{
    color:'#000000',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  dataText:{
    fontSize:20,
    marginTop:'5%'
  }




})

function userLikedReviews(props){

  const nav = useNavigation();
  const [userLikedReviews,setUserLikedReviews] = React.useState([]);
  const [loaded,setLoaded] = React.useState(false);
  const [refresh,setRefresh] = React.useState(false);
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
          style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8'
          }}
      />
    );
  };


  useFocusEffect(
    React.useCallback(() => {
    const loadData = async () =>{

      const token = await AsyncStorage.getItem(TOKEN);
      const userid = await AsyncStorage.getItem(USERID);




      if(token != null){

          const userRevReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , userRevReq)
            .then((response) => response.json())
            .then((responseJson)=>{
              setUserLikedReviews(responseJson.liked_reviews);
              setLoaded(true)




            })
            .catch((error) => {
              console.log(String(error))
            //  alert("unable to fetch data")



            })

      }


      else{
        alert("sign in")
        setLoaded(false)

      }
//
    }
    //eof

    //console.log(locReviews.location_id + " data source");
    loadData();


  },[refresh])
);





const unlikeReview = async(review_id,location_id) =>{
  const token = await AsyncStorage.getItem(TOKEN);
  const locid = location_id;
  const userid = await AsyncStorage.getItem(USERID);
  const revID = review_id;
  const unlikeReviewReq = {
    method:'DELETE',
    headers:{ 'Content-Type': 'application/json','X-Authorization': String(token)},



  }
   fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locid) + '/review/' + String(revID) + '/like', unlikeReviewReq)
    .then((response) => {
      if(response.ok){
        setRefresh(true);


      }
    })
    .then((responseJson)=>{



    })
    .catch((error) => {
      console.log(String(error))
      alert("unable to unlike review")


    })

}



  return(
    <SafeAreaView style={styles.container}>
    {!loaded?(
      <View style={styles.container}>
      <Text> unable to fetch data </Text>
      </View>
    ):(
      <FlatList
        data={userLikedReviews}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({item,index})=>(


   
         <View style={styles.container}>
         <Text style={styles.dataText}>LOC ID: {item.location.location_id}</Text>
          <Text style={styles.dataText}>REV ID ID: {item.review.review_id}</Text>
         <Text style={styles.dataText}>Likes: {item.review.likes}</Text>
         <Text style={styles.dataText}>Overall rating: {item.review.overall_rating}</Text>
         <Text style={styles.dataText}>Overall price: {item.review.price_rating}</Text>
         <Text style={styles.dataText}>Quality rating: {item.review.quality_rating}</Text>
         <Text style={styles.dataText}>Cleanliness: {item.review.clenliness_rating}</Text>
         <Text style={styles.dataText}>Review: {item.review.review_body}</Text>
         <TouchableOpacity
         style={styles.btnStyle}

         onPress = {() => unlikeReview(item.review.review_id,item.location.location_id)}
         >
         <Text style = {styles.buttonText}>UNLIKE</Text>
         </TouchableOpacity>
         </View>


          )}
          keyExtractor={(item,index) => item.review.review_id.toString()}
          extraData = {refresh}
        />
    )}

    </SafeAreaView>
  )
};
export default userLikedReviews;
