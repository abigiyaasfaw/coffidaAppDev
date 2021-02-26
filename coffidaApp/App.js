
import * as React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity,ScrollView,KeyboardAvoidingView} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import SignUp from './components/userSignUp';
import HomeScreen from './components/homescreen';
import addReview from './components/addReview';
import LogIn from './components/userLogIn';
import Locations from './components/Locations';
import viewReviews from './components/viewReviews';
import viewUserReviews from './components/viewUserReviews';
import updateReview from './components/updateReview';
import updateUser from './components/settings';

import userLikedReviews from './components/userLikedReviews';
import userLocationFaves from './components/userLocationFaves';

import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavRoutes(){
  return(
    <Drawer.Navigator initialRouteName = "Home">
    <Drawer.Screen name = "Home" component = {HomeScreen}/>
    <Drawer.Screen name="Log in" component={LogIn}/>
    <Drawer.Screen name="View User Reviews" component={viewUserReviews}/>
    <Drawer.Screen name="Update User" component={updateUser}/>
    <Drawer.Screen name="Liked Reviews" component={userLikedReviews}/>
    <Drawer.Screen name="Favourite Locations" component={userLocationFaves}/>


    </Drawer.Navigator>
  );
}

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name = "Home" component={DrawerNavRoutes}/>
        <Stack.Screen name="Sign up" component={SignUp}/>
        <Stack.Screen name="Log in" component={LogIn}/>
        <Stack.Screen name ="Locations" component={Locations}/>
        <Stack.Screen name="Add Review" component={addReview}/>
        <Stack.Screen name="View Reviews" component={viewReviews}/>
        <Stack.Screen name="View User Reviews" component={viewUserReviews}/>
        <Stack.Screen name = "Update Review" component={updateReview}/>
        <Stack.Screen name = "Update User" component={updateUser}/>


      </Stack.Navigator>
    </NavigationContainer>


  )
}

export default App;
