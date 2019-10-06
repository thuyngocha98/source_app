import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { UserToken } from '../components/user/Login'
type props = {navigation?:any}



{/** chua fix xong */}
export default class AuthLoadingUserScreen extends React.Component <props>{
    constructor(props) {
      super(props);
      this._signInAsync();
      this._bootstrapAsync();
      // console.log('chay vo AuthLoadingUserScreen');
    }

    _signInAsync = async () => {
      try{
          await AsyncStorage.setItem('userToken', UserToken);
          // console.log("TokenSave: " + UserToken)
      }catch(erro){
        alert(erro)
      }
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      // console.log("Token AuthLoadingUserScreen: " + userToken);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'properties' : 'login',{AuthLoading: 'properties'});
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });