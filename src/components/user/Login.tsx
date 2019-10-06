import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as Facebook from 'expo-facebook';
import { connect } from 'react-redux';
import { SAVE_INFO_USER } from '../../actions/ActionTypes';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { CheckBox } from 'react-native-elements';
import { screenWidth, screenheight } from '../Common/Dimension'
export let UserToken: string;
type props = { navigation: any, dispatch: any};
type state = { userToken?: string, userResponse?: any, AuthLoading?: string};
class Login extends Component<props, state>{
  constructor(props) {
    super(props);
      try{
        this.state={
          userToken: this.props.navigation.getParam('status', ''),
          AuthLoading: this.props.navigation.getParam('AuthLoading')
        }
      }catch(erro){

      }
  }
  componentDidUpdate() {
    if(UserToken!==this.state.userToken){
      UserToken = this.state.userToken;
    }
  }

  async logInFB() { // đăng nhập với tài khoản fb
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync('370002670561633', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const user = await response.json();
        this._bootstrapAsync();
        this.setState({
          userToken: token,
          userResponse: user
        })
        this._saveInAsync();
      
      } else {
        Alert.alert(
          "Thông Báo!",
          "Lỗi đăng nhập vui lòng thử lại sau!",
          [ {
              text: "",
              style:'default'
            },
          ],
          { cancelable: false }
        );
      }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
  }

  _bootstrapAsync = async () => { // lấy dữ liệu trên máy
    const userToken = await AsyncStorage.getItem('userToken');
    UserToken = userToken;
  };

  _saveInAsync = async () => { // lưu lại dữ liệu trên máy
    try{
      await AsyncStorage.setItem('userToken', this.state.userToken);
      this.props.navigation.navigate(this.state.AuthLoading);
    }catch(erro){
      alert(erro)
    }
   
  };

    render() {
        return (
          <ScrollView>
            <View style={styles.viewStyles}>
              <View style={{alignItems:'center', marginTop: 25}}>
                <Image
                  style={{width:screenWidth/1.5, height: screenWidth/2.95, marginBottom: 60}}
                  source={require('../../../assets/images/userscreen/logo_company1.png')}/>
              </View>
            <View style={styles.ButtonStyle}>
              <TouchableOpacity 
                onPress= {
                  this.logInFB.bind(this)
                }
                style={styles.FacebookStyle} activeOpacity={0.5}>
                <Image
                  source={require('../../../assets/images/userscreen/iconFb.png')}
                  style={styles.ImageIconStyle} />
                <View style={styles.SeparatorLine} />
                <Text style={styles.TextButtonStyle}>Đăng nhập bằng Facebook </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.RulesStyle}>
                <Text>Tôi đồng ý với </Text>
                <TouchableOpacity>
                  <Text style={{color: 'blue'}}>  Điều khoản sử dụng</Text>
                </TouchableOpacity>
                
                <CheckBox
                  right
                  checked={this.state.checked}      
                  onPress={() => this.setState({checked: !this.state.checked})}
                  checkedColor= 'green'
                />
            </View>         */}
            <View  style={{alignItems: 'center', marginTop: 100}}>
                <TouchableOpacity>
                    <Text style={{color: 'grey'}}>Cần trợ giúp?</Text>
                </TouchableOpacity>
            </View>
            
            </View>
            </ScrollView>
        );
      }
    
}
const WithButtonStyle = screenWidth/1.7+ 10;
const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        marginTop: screenheight/6,
        backgroundColor: '#fff'
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
      FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: WithButtonStyle,
        borderRadius: 5,
        margin: 7,
      },
      ImageIconStyle: {
        padding: 13,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
      },
     
     
      TextButtonStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
        marginLeft: 9,
        paddingRight: 10
      },
      SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
      },
      RulesStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      TextStyle: {
        marginTop: 100,
        alignItems: 'center'
      },
      ButtonStyle:{
        marginTop: 20,
        alignItems:'center', 
        justifyContent: 'center',
      }
  })
export default connect("")(Login)