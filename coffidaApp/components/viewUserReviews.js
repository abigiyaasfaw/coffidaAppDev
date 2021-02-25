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

function viewUserReviews({navigation}){

  const nav = useNavigation();
  const [userReviews,setUserReviews] = React.useState([]);
  const [loaded,setLoaded] = React.useState(false);
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
      const locid = await AsyncStorage.getItem(LOCID);
      const userid = await AsyncStorage.getItem(USERID);

    //  console.log(id + " id")
      var str_token = String(token);


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
              setUserReviews(responseJson.reviews);
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


  },[loaded,setUserReviews])
);

const viewReviews = async() =>{
  const currLocID = await AsyncStorage.getItem(LOCID);
  console.log(userReviews)
  console.log(currLocID + " lool")
  //AsyncStorage.setItem(LOCID,)
  if(currLocID !== null){
    AsyncStorage.setItem(LOCID,String(currLocID));
    console.log(currLocID + " lool")
    nav.navigate('View Reviews');
  }


}
const viewReview = (currLocID,revLocID,price,qual,clean,overall,desc) =>{
  AsyncStorage.setItem(REVLOCID,String(currLocID));
  AsyncStorage.setItem(CUR_REV,String(revLocID));
  AsyncStorage.setItem(PRICE,String(price));
  AsyncStorage.setItem(QUAL,String(qual));
  AsyncStorage.setItem(CLEAN,String(clean));
  AsyncStorage.setItem(OVERALL,String(overall));
  AsyncStorage.setItem(DESC,String(desc));
  console.log(price + qual + clean + overall + desc + " params");
  console.log(userReviews[0]);

  nav.navigate("Update Review")
}

const favLoc = async() =>{

}
const unFavLoc = async() =>{

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

         <View style={styles.container}>
         <Text style={styles.dataText}>LOC ID: {item.location.location_id}</Text>
          <Text style={styles.dataText}>REV ID ID: {item.review.review_id}</Text>
          {item.review.photo_path != null?

            <Image
            source={{
                  uri:  String(item.review.photo_path),
                }}
                style={{ width: 100, height: 100 }}
              />
              :
              null


          }
         <Text style={styles.dataText}>Likes: {item.review.likes}</Text>
         <Text style={styles.dataText}>Overall rating: {item.review.overall_rating}</Text>
         <Text style={styles.dataText}>Overall price: {item.review.price_rating}</Text>
         <Text style={styles.dataText}>Quality rating: {item.review.quality_rating}</Text>
         <Text style={styles.dataText}>Cleanliness: {item.review.clenliness_rating}</Text>
         <Text style={styles.dataText}>Review: {item.review.review_body}</Text>
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
