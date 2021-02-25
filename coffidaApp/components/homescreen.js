import 'react-native-gesture-handler';
import * as React from 'react';
import {Component} from 'react';
import {useState,useEffect} from "react";
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

const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
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
    textAlign:'center',
    marginTop:'5%'
  },
  dataLayout:{
    flex:1,
    height:'100%',
    width:'100%'

  },
  dataText:{
    fontSize:10,
    marginLeft:'10%'
  }
});

// const renderRow = ({item}) => {
//   return (
//
//     <ListItem>
//       <Text style={{color:'red'}}> {item.name}</Text>
//       </ListItem>
//       )
//
// };

// const onRefresh = () => {
//   setUserData([])
// }





function HomeScreen(props){

  const [locData, setLocData] = useState([])
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const[lastId,setLastId] = React.useState("");
  const nav = useNavigation();
  const [currID,setCurrID] = React.useState("");
  const [userLocFav,setUserLocFav] = React.useState([]);
  const[faveStatus,setFaveStatus] = React.useState(false);



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
    const getLocations = async () =>{
      const token = await AsyncStorage.getItem(TOKEN);
      const id = await AsyncStorage.getItem(USERID);
      const curr_loc_id = await AsyncStorage.getItem(LOCID);

      var str_token = String(token);
      if(token != null){
        const postReq = {
          method:'GET',
          headers:{ 'Content-Type': 'application/json','X-Authorization': str_token}


        }
         fetch('http://10.0.2.2:3333/api/1.0.0/find', postReq)
          .then((response) => response.json())
          .then((responseJson)=>{
            setLocData(responseJson)
            setLoaded(true)


          })
          .catch((error) => {
            console.log(String(error))
            alert("unable to fetch user")
            setLoaded(false)

          })
          // .finally(()=>setLoaded(false));
          const locReq = {
            method:'GET',
            headers:{ 'Content-Type': 'application/json','X-Authorization': String(token),

            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }


          }
          fetch('http://10.0.2.2:3333/api/1.0.0/user/' + String(id)  , locReq)
          .then((response) => response.json())
          .then((responseJson)=>{
            //console.log(responseJson.favourite_locations)
            setUserLocFav(responseJson.favourite_locations);




          })
          .catch((error) => {
            console.log(String(error))
          //  alert("unable to fetch data")



          })

      }


      else{
        alert("error")
        setLoaded(false)

      }
    }


    getLocations();
    console.log(userLocFav);


  },[faveStatus])

  //var getLocData = locData;







//  const tokenSaved =  AsyncStorage.getItem(TOKEN);



const unFavLoc = async(locID) =>{
  const token = await AsyncStorage.getItem(TOKEN);
  const str_token = String(token);
  console.log("un fav")
  const unFavReq = {
    method:'DELETE',
    headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



  }
   fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locID) + '/favourite'  , unFavReq)
    .then((response) => {
      if(response.ok){
        setFaveStatus(!faveStatus)
      }
    })
    .then((responseJson)=>{



    })
    .catch((error) => {
      console.log(String(error))



    })

}

const favLoc = async(locID) =>{
  console.log(" fave")
  const token = await AsyncStorage.getItem(TOKEN);
  const str_token = String(token);
  const favReq = {
    method:'POST',
    headers:{ 'Content-Type': 'application/json','X-Authorization': str_token},



  }
   fetch('http://10.0.2.2:3333/api/1.0.0/location/' + String(locID) + '/favourite'  , favReq)
    .then((response) => {
      if(response.ok){
        setFaveStatus(!faveStatus)
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
           style={styles.btnStyle}

           onPress = {() => {
             AsyncStorage.setItem(LOCID,String(item.location_id))
             nav.navigate("Locations")


           }}
           >
           <Text style = {styles.buttonText}>Name: {item.location_name} Town: {item.location_town}</Text>
           </TouchableOpacity>
           {userLocFav.some(x=>x.location_id == item.location_id)?
             <TouchableOpacity
             style={styles.btnStyle}

             onPress = {() => unFavLoc(item.location_id)}
             >
             <Text style = {styles.buttonText}>Un Fave</Text>
             </TouchableOpacity>
             :
             <TouchableOpacity
             style={styles.btnStyle}

             onPress = {() => favLoc(item.location_id)}
             >
             <Text style = {styles.buttonText}>Fave</Text>
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
//     <View style={styles.container}>
//       <Text>Test</Text>
//       <FlatList
//         data = {userData}
//         keyExtractor = {item => item.first}
//           renderItem={({item})=>(
//             <View style={styles.listItem}>
//               <Text>{'${item.name.first}
//             }${
//               item.name.last
//             }'}</Text>
//           )}
//           />
//       </View>
//
// );

};
export default HomeScreen;
