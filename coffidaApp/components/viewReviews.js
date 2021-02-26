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


useEffect(()=>{
  const loadData = async () =>{

    const token = await AsyncStorage.getItem(TOKEN);
    const locid = await AsyncStorage.getItem(LOCID);
    const userid = await AsyncStorage.getItem(USERID);
      const savedFilterStatus = await AsyncStorage.getItem(PROFANITY);
  //  console.log(id + " id")
    var str_token = String(token);


    if(token != null){
      const postReq = {
        method:'GET',
        headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
      }


      }

       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locid)  , postReq)
        .then((response) => response.json())
        .then((responseJson)=>{
          if(savedFilterStatus == "true"){
            var safeRevs = responseJson.location_reviews.filter(review=>!review.review_body.includes("tea")||!review.review_body.includes("tea")||
          !review.review_body.includes("tea")||!review.review_body.includes("tea")||!review.review_body.includes("tea"))
          console.log(safeRevs + " SAFEEE")
          setLocReviews(safeRevs);
          setLocID(Number(locid))

          }
          else{
            setLocReviews(responseJson.location_reviews)

            setLocID(Number(locid))
          }
            // console.log(responseJson)




        })
        .catch((error) => {
          console.log(String(error))
          alert("unable to fetch data")
          setLoaded(false)

        })

        var count = 0;
        if(String(savedFilterStatus) == "true"){
          console.log("TRUE")
          setProfanityStatus(true);
          var noProfanityArr = [];
          var safeRevs = locReviews.filter(review=>!review.review_body.includes("tea")||!review.review_body.includes("tea")||
        !review.review_body.includes("tea")||!review.review_body.includes("tea")||!review.review_body.includes("tea"))
          console.log(safeRevs.review_id + " safe")
          setLocReviews([]);
          setLocReviews(safeRevs)
          setLoaded(true)
          const reviewReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , reviewReq)
            .then((response) => response.json())
            .then((responseJson)=>{
              var safeRevsLiked = responseJson.liked_reviews.filter(review=>!review.review.review_body.includes("tea")||!review.review.review_body.includes("tea")||
            !review.review.review_body.includes("tea")||!review.review.review_body.includes("tea")||!review.review.review_body.includes("tea"))
              setUserLiked(safeRevsLiked);
              console.log(safeRevsLiked[0].review.review_id + " liked")




            })
            .catch((error) => {
              console.log(String(error))
            //  alert("unable to fetch data")



            })


          // console.log(safeReviews + " safe reviews")

          console.log(locReviews.length + " changed?")
        }
        else{
          setProfanityStatus(false)
          console.log("FALSE")
          setLoaded(true)

          const reviewReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }


          }

            fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(userid)  , reviewReq)
            .then((response) => response.json())
            .then((responseJson)=>{

              setUserLiked(responseJson.liked_reviews);




            })
            .catch((error) => {
              console.log(String(error))
            //  alert("unable to fetch data")



            })
        }






    }


    else{
      alert("sign in")
      setLoaded(false)

    }

  }


  //console.log(locReviews.location_id + " data source");
  loadData();


//  console.log(userLocLiked);


},[liked])











const unLike = async(item) =>{
  const token = await AsyncStorage.getItem(TOKEN);
  const locid = await AsyncStorage.getItem(LOCID);
  const userid = await AsyncStorage.getItem(USERID);
  const revID = item;
  const str_token = String(token);
  const str_loc_id = String(locid);
  const rev_str = String(revID);
  console.log(rev_str + " rev")
  console.log(item)

    //remove like


    if(str_token != null && str_loc_id != null && rev_str != null){


      const unlikeReviewReq = {
        method:'DELETE',
        headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



      }
       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_loc_id + '/review/' + rev_str + '/like', unlikeReviewReq)
        .then((response) => {
          if(response.ok){
            setLiked(!liked);


          }
        })
        .then((responseJson)=>{



        })
        .catch((error) => {
          console.log(String(error))
          alert("unable to unlike review")


        })

        //console.log(liked + " liked?")
    }
    setUpdateList(!updateList);
    //setLiked(!liked);
  }



const addLike = async(item) =>{
  const token = await AsyncStorage.getItem(TOKEN);
  const locid = await AsyncStorage.getItem(LOCID);
  const revID = item;
  const str_token = String(token);
  const str_loc_id = String(locid);
  const rev_str = String(revID);
  // console.log(rev_str + " rev")
  // console.log(item)




    if(str_token != null && str_loc_id != null && rev_str != null){


      const likeReviewReq = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



      }
       fetch('http://10.0.2.2:3333/api/1.0.0/location/' + str_loc_id + '/review/' + rev_str + '/like', likeReviewReq)
        .then((response) => {
          if(response.ok){
              setLiked(!liked);


          }
        })
        .then((responseJson)=>{



        })
        .catch((error) => {
          console.log(String(error))
          alert("unable to unlike review")


        })

        //console.log(liked + " liked")
    }
    setUpdateList(!updateList);
    //setLiked(!liked)





}

  //console.log(locReviews.location_id + " outside use effect")

  //var getLocData = locData;







//  const tokenSaved =  AsyncStorage.getItem(TOKEN);









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
