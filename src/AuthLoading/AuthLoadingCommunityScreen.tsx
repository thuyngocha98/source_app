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


{/** chua fix xong */}
// điều khiển chuyển trang khi login hay chưa
type state = {userToken?:any}
type props = {navigation?:any}
export default class AuthLoadingCommunityScreen extends React.Component <props, state>{
    constructor(props) {
      super(props);
      this.state={userToken: ''}
      this._signInAsync();
      this._bootstrapAsync();
    }
   
  

    _signInAsync = async () => {
        try{
          await AsyncStorage.setItem('userToken', UserToken);
          console.log("TokenSave: " + UserToken)
          //this.props.navigation.navigate('properties');
        }catch(erro){
          alert(erro)
        }
      }
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      this.setState({ userToken: await AsyncStorage.getItem('userToken')
      
    });
      //console.log("Token AuthLoadingCommunityScreen: " + this.state.userToken);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      //this.props.navigation.navigate(this.state.userToken ? 'community' : 'login');
      this.props.navigation.navigate(this.state.userToken ? 'community' : 'community',{AuthLoading: 'community'});
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