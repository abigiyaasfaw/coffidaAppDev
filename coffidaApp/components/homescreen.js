import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {useState,useEffect} from "react";
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StyleSheet,Button,FlatList,SafeAreaView,TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'
//import {ListItem} from 'native-base';

const lastId = '@save_locid';
const TOKEN = '@save_token';
const USERID = '@save_id';
const LOCID = '@save_locid';
const LOCNAME = '@save_locname';
const LOCTOWN = '@save_loctown';

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    backgroundColor:'#fff',
    height:'100%',
    width:'100%',
    justifyContent:'center'
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
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:'5%',
    backgroundColor:'#d27535',
    borderRadius:10

  },
  dataLayout:{
    flex:1,
    height:'100%',
    width:'100%'

  },
  dataText:{
    fontSize:10,
    marginLeft:'10%'
  },
  faveButton:{
    color:'#f9e00a',
    backgroundColor:'#000',
    width:'20%',
    padding:0,
    marginLeft:'5%',
    textAlign:'center',
    marginTop:'1%',
    marginBottom:'1%',
    fontWeight:'bold'
  },
  unFaveButton:{
    color:'#000',
    backgroundColor:'#f9e00a',
    width:'30%',
    padding:0,
    marginLeft:'5%',
    textAlign:'center',
    marginTop:'1%',
    marginBottom:'1%',
    fontWeight:'bold'
  },
  locationBtnStyle:{
    width:'50%',
    marginLeft:'20%',
    borderColor: '#000',
    borderRadius:5


  }
});







function HomeScreen(props){
  //set states
  const [locData, setLocData] = useState([])
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const[lastId,setLastId] = React.useState("");
  const nav = useNavigation();
  const [currID,setCurrID] = React.useState("");
  const [userLocFav,setUserLocFav] = React.useState([]);
  const[faveStatus,setFaveStatus] = React.useState(false);


//method returns view that appears between each flatlist item
  const ItemSeparatorView = () => {
    return (

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

//load locations when user is on page, the flatlist is filled
useFocusEffect(
  React.useCallback(()=>{
    const getLocations = async () =>{
      //load user id, token and location id to access data from fetch
      const token = await AsyncStorage.getItem(TOKEN);
      const id = await AsyncStorage.getItem(USERID);
      const curr_loc_id = await AsyncStorage.getItem(LOCID);

      let str_token = String(token);
      if(token != null){
        //execute get request if token is not null
        const postReq = {
          method:'GET',
          headers:{ 'Content-Type': 'application/json','X-Authorization': str_token}


        }
         fetch('http://10.0.2.2:3333/api/1.0.0/find', postReq)
          .then((response) => response.json())
          .then((responseJson)=>{
            //set response to array to fill the flatlist
            setLocData(responseJson)
            setLoaded(true)


          })
          .catch((error) => {
            console.log(String(error))
            alert("unable to fetch user")
            setLoaded(false)

          })
          // .finally(()=>setLoaded(false));
          //get request to get user's favourite locations
          const locReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
            //response status 304 kept getting returned
            //these directives make sure that the data isnt stored in a cache
          }


          }
          fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(id)  , locReq)
          .then((response) => response.json())
          .then((responseJson)=>{
            //console.log(responseJson.favourite_locations)
            setUserLocFav(responseJson.favourite_locations);
            //get user's fave locations and add to array



          })
          .catch((error) => {
            console.log(String(error))




          })

      }


      else{
        alert("error")
        setLoaded(false)

      }
    }


    getLocations();
    console.log(userLocFav);


  },[faveStatus,loaded])
  //reload useFocusEffect if these variables change
)













const unFavLoc = async(locID) =>{
  //method to undavourite a location
  //location id passed to access it's info from the api
  const token = await AsyncStorage.getItem(TOKEN);
  const str_token = String(token);
  console.log("un fav")
  //delete request headers
  const unFavReq = {
    method:'DELETE',
    headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



  }
  //delete request fetch url
   fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locID) + '/favourite'  , unFavReq)
    .then((response) => {
      if(response.ok){
        setFaveStatus(!faveStatus)
        //fave status's value changed
        //reloads the use useFocusEffect
        //and refills the flatlist with updated data
      }
    })
    .then((responseJson)=>{



    })
    .catch((error) => {
      console.log(String(error))



    })

}

const favLoc = async(locID) =>{
  //method to favourite a location

  console.log(" fave")
  const token = await AsyncStorage.getItem(TOKEN);
  //load user token to use in fetch header
  const str_token = String(token);
  //post headers
  const favReq = {
    method:'POST',
    headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



  }
   fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locID) + '/favourite'  , favReq)
   //fetch url to favourite a location
    .then((response) => {
      if(response.ok){
        setFaveStatus(!faveStatus)
        //if successful change value of faveStatus so that the flatlist can be
        //repopulated with the updated data
      }
    })
    .then((responseJson)=>{



    })
    .catch((error) => {
      console.log(String(error))



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
         data={locData}
         ItemSeparatorComponent={ItemSeparatorView}
         renderItem={({item,index})=>(
           <View style={styles.dataLayout}>

           <TouchableOpacity
           style={styles.locationBtnStyle}

           onPress = {() => {
             AsyncStorage.setItem(LOCID,String(item.location_id))
             AsyncStorage.setItem(LOCNAME,String(item.location_name))
             AsyncStorage.setItem(LOCTOWN,String(item.location_town))

             nav.navigate("Locations")


           }}
           >
           <Text style = {styles.buttonText}>{item.location_name}, {item.location_town}</Text>
           </TouchableOpacity>
           {userLocFav.some(x=>x.location_id == item.location_id)?
             <TouchableOpacity
             style={styles.locationBtnStyle}

             onPress = {() => unFavLoc(item.location_id)}
             >
             <Text style = {styles.unFaveButton}>Un Fave</Text>
             </TouchableOpacity>
             :
             <TouchableOpacity
             style={styles.locationBtnStyle}

             onPress = {() => favLoc(item.location_id)}
             >
             <Text style = {styles.faveButton}>Fave</Text>
             </TouchableOpacity> 


           }

          </View>
         )}
         keyExtractor={(item,index) => item.location_id.toString()}
         extraData ={faveStatus}

       />
     )}



    </SafeAreaView>
   )

};
export default HomeScreen;
