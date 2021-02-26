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
//import {ListItem} from 'native-base';

const lastId = '@save_locid';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';
const CUR_REV = '@save_curr_rev_id';
const REV_ID = '@save_rev_id';
const STATE = '@save_state';
const PROFANITY = '@save_filter';
//values to get and set items in AsyncStorage

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor:'#cd853f'
  },
  item:{
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  loadBtn:{
    backgroundColor:"#ffefd5",
    borderRadius:5,
    height:'10%',
    width:'60%',
    marginTop:'1%',
    marginLeft:'30%',
    justifyContent:'center'
  },

  buttonText:{
    color:'#000000',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  dataLayout:{
    flex:1,
    height:'100%',
    width:'100%',
    backgroundColor:'#fff'

  },
  dataText:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:'10%',
    alignItems:'center',
    marginTop:'5%'
  },
  likeBtnView:{
    flex:1,
    flexDirection:'row',
    width:'20%',
    height:'50%'
  },
  likeBtn:{
    backgroundColor:"#ffefd5",
    borderRadius:5,
    height:'10%',
    width:'30%',
    marginTop:'5%',
    marginLeft:'5%',
    paddingLeft:'2%',
    paddingRight:'2%',
    marginRight:'5%',
    marginBottom:'5%',
    marginRight:'10%',
    alignItems:'center'
  }
});








function viewReviews(props){

  const [locReviews, setLocReviews] = useState([])
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const[lastId,setLastId] = React.useState("");
  const [currID,setCurrID] = React.useState("")
  const navigation = useNavigation();
  const [liked,setLiked] = React.useState(false);
  const [likeRevTxt, setLikeRevText] = React.useState("LIKE");
  const [indexes,setIndexes] = React.useState([]);
  const [userLiked,setUserLiked] = React.useState([]);
  const [locID, setLocID] = React.useState(0);
  const [likedInd,setLikedInd] = React.useState(false);
  const [userNotLiked,setUserNotLiked] = React.useState([]);
  const [userLocLiked, setUserLocLiked] = React.useState([]);
  const [updateList, setUpdateList] = React.useState(false);
  const [showDialog,setShowDialog] = React.useState(false);
  const [likedStatus, setLikedStatus] = React.useState("");
  const[currIndex,setCurrIndex] = React.useState(null);
  const[safeReviews, setSafeReviews] = React.useState([])
  const [profanityStatus,setProfanityStatus] = React.useState(false);
  //state variables declared and set using useState hooks




  const ItemSeparatorView = () => {
    return (
      //returns a view between each FlatList item
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
React.useCallback(()=>{
  const loadData = async () =>{

    const token = await AsyncStorage.getItem(TOKEN);
    const locid = await AsyncStorage.getItem(LOCID);
    const userid = await AsyncStorage.getItem(USERID);
    //get values from AsyncStorage
    //get location id to access its values from the api
    const savedFilterStatus = await AsyncStorage.getItem(PROFANITY);
      //get status of filter


    var str_token = String(token);


    if(token != null){
      //load only if user is logged in
      const getReq = {
        method:'GET',
        headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),
        //get request headers
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
        //forces no cache to be stored
        //gets rid of 304
      }


      }

       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locid)  , getReq)
       //get request to get a location's info
        .then((response) => response.json())
        .then((responseJson)=>{
          //if response successful, return response json
          if(savedFilterStatus == "true"){
            //check if user has set profanity filter on
            let safeRevs = responseJson.location_reviews.filter(review=>!review.review_body.includes("tea")||!review.review_body.includes("tea")||
          !review.review_body.includes("tea")||!review.review_body.includes("tea")||!review.review_body.includes("tea"))
          //filter reviews that dont include any 'profanity' and add to array

          setLocReviews(safeRevs);
          //add 'safe' reviews to array
          //which will be used to fill the FlatList
          setLocID(Number(locid))
          //set location id state variable

          }
          else{
            setLocReviews(responseJson.location_reviews)
            //if profanity filter is not on
            //set location reviews array to json returned by response
            setLocID(Number(locid))
            //save location id to state variable
          }





        })
        .catch((error) => {
          console.log(String(error))
          alert("unable to fetch data")
          setLoaded(false)
          //catch error
          //notify user that data cant be loaded

        })

        var count = 0;
        if(String(savedFilterStatus) == "true"){

          const userLikesReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
            //forces no cache to be stored
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , userLikesReq)
            //fetch user's info
            .then((response) => response.json())
            .then((responseJson)=>{
              //if successful, return response in json format
              var safeRevsLiked = responseJson.liked_reviews.filter(review=>!review.review.review_body.includes("tea")||!review.review.review_body.includes("tea")||
            !review.review.review_body.includes("tea")||!review.review.review_body.includes("tea")||!review.review.review_body.includes("tea"))
            //checks and adds reviews without any profanity to an array
            //since profanity filter is on
              setUserLiked(safeRevsLiked);
              //set state array to 'safe' reviews






            })
            .catch((error) => {
              console.log(String(error))
              //catch error




            })


          // console.log(safeReviews + " safe reviews")

          console.log(locReviews.length + " changed?")
        }
        else{
          //if profanity filter is not on
          //get user info
          setProfanityStatus(false)
          console.log("FALSE")
          setLoaded(true)

          const userReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , userReq)
            //get request to get user's info
            .then((response) => response.json())
            .then((responseJson)=>{

              setUserLiked(responseJson.liked_reviews);
              //get user's liked and set to state array




            })
            .catch((error) => {
              console.log(String(error))
            //catch error



            })
        }






    }


    else{
      alert("sign in")
      setLoaded(false)
      //if token is null
      //means user hasnt logged in
      //notify user that they have to log in
      //dont load flat list

    }

  }


  //console.log(locReviews.location_id + " data source");
  loadData();


//  console.log(userLocLiked);


},[liked])
//flatlist loads when screen is in focus
//and if liked variable changes value

)









const unLike = async(item) =>{
  //method to unlike a review
  const token = await AsyncStorage.getItem(TOKEN);
  const locid = await AsyncStorage.getItem(LOCID);
  const userid = await AsyncStorage.getItem(USERID);
  const revID = item;
  //get argument (which is review id) and set to variable
  const str_token = String(token);
  const str_loc_id = String(locid);
  const rev_str = String(revID);
  //load relevant values from AsyncStorage





    if(str_token != null && str_loc_id != null && rev_str != null){
      //check relevant values to access the api are not null

      const unlikeReviewReq = {
        method:'DELETE',
        headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
        //delete request headers


      }

       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_loc_id + '/review/' + rev_str + '/like', unlikeReviewReq)
       //execute delete request
        .then((response) => {
          if(response.ok){
            setLiked(!liked);
            //if delete successful
            //change liked status
            //so FlatList reloads with the new update data


          }
        })

        .catch((error) => {
          console.log(String(error))
          alert("unable to unlike review")
          //notify user if there's an error


        })


    }


  }



const addLike = async(item) =>{
  //method to add like to a review
  //argument is review id of flatlist item
  const token = await AsyncStorage.getItem(TOKEN);
  const locid = await AsyncStorage.getItem(LOCID);
  const revID = item;
  const str_token = String(token);
  const str_loc_id = String(locid);
  const rev_str = String(revID);





    if(str_token != null && str_loc_id != null && rev_str != null){
      //check that the relevant values to access the api are not null

      const likeReviewReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},
        //set headers and pass token for a post request


      }
       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_loc_id + '/review/' + rev_str + '/like', likeReviewReq)
       //execute post request to add a like
        .then((response) => {
          if(response.ok){
              setLiked(!liked);
              //if request successful
              //change liked variable
              //so flatlist reloads


          }
        })
        .catch((error) => {
          console.log(String(error))
          alert("unable to like review")
          //catch error
          //alert user of error


        })


    }

    





}











   return(

     <SafeAreaView style={styles.container}>
     {!loaded?(
       <View style={styles.container}>
       <Text> unable to fetch data </Text>
       </View>
     ):(
       <FlatList
         data={locReviews}
         ItemSeparatorComponent={ItemSeparatorView}
         renderItem={({item,index})=>{
           return(
              <View style={styles.container}>

              <Text style={styles.dataText}>ID:{item.review_id}</Text>
              <Text style={styles.dataText}>Overall:{item.overall_rating}</Text>
              <Text style={styles.dataText}>Price: {item.price_rating}</Text>
              <Text style={styles.dataText}>Quality: {item.quality_rating}</Text>
              <Text style={styles.dataText}>Cleanliness: {item.clenliness_rating}</Text>
              <Text style={styles.dataText}>Review: {item.review_body}</Text>
              <Text style={styles.dataText}>Likes: {item.likes}</Text>
             {userLiked.some(x=>x.location.location_id == Number(locID) && x.review.review_id == item.review_id  )?
               <TouchableOpacity
               style={styles.likeBtn}
               onPress = {() => unLike(item.review_id)}>
               <Text style={styles.dataText}>UNLIKE</Text>

              </TouchableOpacity>

              :
              <TouchableOpacity
              style={styles.likeBtn}
              onPress = {() => addLike(item.review_id)}>
              <Text style={styles.dataText}>Like</Text>

             </TouchableOpacity>


             }



















          </View>


        )}}
           keyExtractor={(item,index) => item.review_id.toString()}
           extraData ={liked}



         />




     )}




    </SafeAreaView>
   )



};
export default viewReviews;
