import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import colors from '../Common/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    CameraRoll, 
    Alert, 
    Linking
} from 'react-native';
import { screenWidth } from '../Common/Dimension';
import {ImagePicker, Permissions, Constants, IntentLauncherAndroid, } from 'expo';
import { Camera } from 'expo-camera';
import { any } from 'prop-types';


class QuestionComponent extends Component{
    state = {
        image: [],
        photoPermission: ''
      };
     
    buttonClickded = async () => {
      Alert.alert(
        "Thông Báo!",
        "Lấy ảnh bằng cách",
        [ {
            text: "Vào thư viện ảnh",
            onPress: this._pickImage,
            style:'default'
          },
          { text: "Dùng camera", onPress: this._takePicture}
        ],
        { cancelable: false }
      );
    };

    render(){
        // const img = this.state.Imgsource === null ? null:
        //     <Image source={this.state.Imgsource} 
        //         s></Image>
        const { image } = this.state;
        return(
            <ScrollView>
            <View style={styles.viewStyles}>
                <Text style={styles.TitleStyles}>Mô tả vấn đề</Text>
                <View style={styles.TextviewStyles}>
                  <TextInput
                    multiline = {true}
                    editable = {true}
                  />
                </View>
                
               
                <Text style={styles.TitleStyles}>Hình đính kèm</Text>
                <View style={styles.AddImgStyles}>
                  <TouchableOpacity onPress={
                      this.checkMultiPermissions}>
                      <Image 
                        source={require('../../../assets/images/Question/add.png')}
                        style={styles.imgStyles}
                       />
                      </TouchableOpacity>
                      <View style={styles.ImgStyles}>
                          {this._renderImages()}
                      </View>
                    {/* <TouchableOpacity onPress={
                      this._takePicture}>
                      <Image 
                        source={require('../../../assets/images/Question/cameras.png')}
                        style={styles.CameraStyles}/>
                  </TouchableOpacity> */}
                </View>

                

                <TouchableOpacity style={styles.upButtonImage}>
                <Text style={{alignItems: 'center',
                            justifyContent: 'center',}}>Đặt câu hỏi</Text>
                </TouchableOpacity>
                
                </View>
                
            </ScrollView>
        )
    }

  onDeleteItem = (index) => {
    let newTaskList = this.state.image.filter( (item, i) => i != index );
    this.setState({ image: newTaskList });
  }
        
  componentDidMount() {
    this.getPermissionAsync();
  }


  openSetting = async () => {
    if(Constants.platform.ios){
      Linking.openURL('app-settings:')
    }
    else{
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_SETTINGS 
      );
    }
    this.setState({openSetting:false});

  }
  
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const result =  await Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL),
      ])
      
      if (result.some(({status}) => status !== 'granted')) {
        Alert.alert(
          "Thông Báo!",
          "Vui lòng cấp quyền cho ứng dụng!",
          [ {
              text: "ok",
              onPress: this.openSetting,
              style:'default'
            },
            
          ],
          { cancelable: false }
        );
        return
      }
    }
  }
  checkMultiPermissions = async () => {
    const { status} = await Permissions.getAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') {
      Alert.alert(
        "Thông Báo!",
        "Vui lòng cấp quyền cho ứng dụng!",
        [ {
            text: "ok",
            onPress: this.openSetting,
            style:'default'
          },
          
        ],
        { cancelable: false }
      );
    }
     else  {
      Alert.alert(
        "Thông Báo!",
        "Lấy ảnh bằng cách",
        [ {
            text: "Vào thư viện ảnh",
            onPress: this._pickImage,
            style:'default'
          },
          { 
            text: "Dùng camera", 
            onPress: this._takePicture
          }
        ],
        { cancelable: false }
      );
    };
  }

  _renderImages() {
    let images = [];
    //let remainder = 4 - (this.state.devices % 4);
    this.state.image.map((item, index) => {
      images.push(
        <View key={index}>
          <Image
            source={{ uri: item }}
            style={{ width: 80, height: 80, marginLeft: 5, marginRight: 5, borderRadius: 5 }} />
             <TouchableOpacity style={{ marginTop: -75, marginLeft: 60 }}
                onPress={ () => this.onDeleteItem(index) }>
            <Text>{`❌`}</Text>
          </TouchableOpacity>
         </View>
      );
    });
    return images;
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [100, 20],
    });
    if (!result.cancelled) {
      this.setState({
        image: this.state.image.concat([result.uri]),
      });
    }
  };

  _takePicture = async () => {
    
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });
  
    if (!result.cancelled) {
      this.setState({ image: this.state.image.concat([result.uri]) });
    }
    //CameraRoll.saveToCameraRoll(result.uri);
  };

  // _takePicture = async () => {
  //           let result = await ImagePicker.launchCameraAsync({
  //           mediaTypes: ImagePicker.MediaTypeOptions.All,
  //           allowsEditing: false,
  //       });
  //       if(!result.cancelled){
  //         this.setState({
  //           image: this.state.image.concat([result.uri]),
  //         });
  //       }
  //   };

}
    
const styles = StyleSheet.create({
    viewStyles:{
        backgroundColor: '#f2f5f8',
    },
    AddImgStyles:{
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row', 
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
        height: 130,
    },
    ImgStyles:{
      borderRadius: 5,
      backgroundColor: 'white',
      flexDirection: 'row', 
      padding: 10,
  },
    TextviewStyles: {
        height: 200,
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
     },
    TitleStyles: {
        margin: 15, 
        fontSize: 20,
        fontWeight:'bold'
    },
    imgStyles:{
        alignItems: 'center',
        width:50, 
        height:50, 
        marginTop: 30,
    },
    CameraStyles:{
      alignItems: 'center',
      width:50, 
      height:50, 
      margin: 6, 
      marginTop: 10,
      justifyContent: 'flex-end',
  },
    showImageStyles:{
        width: 100, 
        height: 100, 
        borderRadius: 10 ,
    },
      upButtonImage: {
        height: 40,
        backgroundColor: '#33CC33',
        fontSize: 15,
        borderRadius:5,
        marginTop:40,
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
      },
   
});
export default QuestionComponent;

