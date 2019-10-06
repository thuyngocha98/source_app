import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Facebook from 'expo-facebook';
import colors from '../Common/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    AsyncStorage
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { screenWidth } from '../Common/Dimension';
import Icon from "react-native-vector-icons/MaterialIcons";
import {UserToken} from'../user/Login'


type props = { navigation?: any }
type state = {
    name?: string,
    sex?: string,
    date?: string,
    mail?:string,
    address?:string,
    work?:string,
    checkName?: boolean,
    checkSex?: boolean,
    checkDate?: boolean,
    checkMail?: boolean,
    checkaddRess?: boolean,
    checkwork?: boolean,
}
class properties extends React.Component <props, state>{
    constructor(props){
        super(props);
        this.state={
            checkName: false,
            checkSex: false,
            checkDate: false,
            checkMail: false,
            checkaddRess: false,
            checkwork: false,
        }
    }

    
    setName = ()=>{
        this.setState({
            checkName: true,
            checkSex: false,
            checkDate: false,
            checkMail: false,
            checkaddRess: false,
            checkwork: false
        })
    }
    setSex = ()=>{
        this.setState({
            checkName: false,
            checkSex: true,
            checkDate: false,
            checkMail: false,
            checkaddRess: false,
            checkwork: false
        })
    }
    setDate = ()=>{
        this.setState({
            checkName: false,
            checkSex: false,
            checkDate: true,
            checkMail: false,
            checkaddRess: false,
            checkwork: false
        })
    }
    setMail = ()=>{
        this.setState({
            checkName: false,
            checkSex: false,
            checkDate: false,
            checkMail: true,
            checkaddRess: false,
            checkwork: false
        })
    }
    setAdrress = ()=>{
        this.setState({
            checkName: false,
            checkSex: false,
            checkDate: false,
            checkMail: false,
            checkaddRess: true,
            checkwork: false
        })
    }
    setWork = ()=>{
        this.setState({
            checkName: false,
            checkSex: false,
            checkDate: false,
            checkMail: false,
            checkaddRess: false,
            checkwork: true
        })
    }
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('login', {status: ''});

      };
    
    render(){
        const name = this.props.navigation.getParam('name', 'noname');
        return(
            <ScrollView style={styles.ScrollStyles}>
                <View>
                    <View style={{alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Image  source={require('../../../assets/images/userscreen/avatafb.jpg')}
                        style={styles.ImageIconStyle}></Image>
                    </View>
                <View style={styles.viewStyles}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.IconTitleStyle}>
                            <Icon
                            name="contacts"
                            color={colorIcon}
                            size={15}/>
                        </View>
                        <Text style={styles.TextTitleStyles}>Thông tin cơ bản</Text>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>      
                            <Text style={styles.TextStyles}>Tên hiển thị</Text>
                            <TextInput 
                                style={styles.textInfor}
                                editable = {this.state.checkName}
                                onChangeText={(name) => this.setState({name})}
                            >{name}</TextInput>
                        </View>
                        <TouchableOpacity 
                            onPress={this.setName}>
                            <View style={{margin: 20}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>       
                            <Text style={styles.TextStyles}>Giới tính</Text>
                            <TextInput 
                                style={styles.textInfor}
                                editable = {this.state.checkSex}
                                onChangeText={(sex) => this.setState({sex})}
                            >no name</TextInput>
                        </View>
                        <TouchableOpacity onPress={this.setSex}>
                            <View style={{margin: 20}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <View style={{flex: 1}}>    
                            <Text style={styles.TextStyles}>Ngày sinh</Text>
                            <TextInput 
                                style={styles.textInfor}
                                editable = {this.state.checkDate}
                                onChangeText={(date) => this.setState({date})}
                            >no name</TextInput>
                        </View>
                        <TouchableOpacity onPress={this.setDate}>
                            <View style={{margin: 20}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.view2ndStyles}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.IconTitleStyle}>
                            <Icon
                            name="call"
                            color={colorIcon}
                            size={15}/>
                        </View>
                        <Text style={styles.TextTitleStyles}>Thông tin liên hệ</Text>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row'}}>
                             
                        <Text style={styles.TextStyles}>Email</Text>
                        <TextInput style={styles.textInfor}
                                editable = {this.state.checkMail}
                                onChangeText={(mail) => this.setState({mail})}>no@gmail.com</TextInput>
                        <TouchableOpacity onPress={this.setMail}>
                            <View style={{margin: 10}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <View style={{flex: 1}}>       
                            <Text style={styles.TextStyles}>Tỉnh/thành phố</Text>
                            <TextInput style={styles.textInfor}
                                editable = {this.state.checkaddRess}
                                onChangeText={(address) => this.setState({address})}>noname</TextInput>
                        </View>
                        <TouchableOpacity onPress={this.setAdrress}>
                            <View style={{margin: 10}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={styles.view2ndStyles}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.IconTitleStyle}>
                            <Icon
                            name="work"
                            color={colorIcon}
                            size={15}/>
                        </View>
                        <Text style={styles.TextTitleStyles}>Công việc</Text>
                    </View>
                    <View style ={styles.LineStyle}></View>
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                        <View style={{flex: 1}}>      
                            <Text style={styles.TextStyles}>Nghề nghiệp</Text>
                            <TextInput style={styles.textInfor}
                                editable = {this.state.checkwork}
                                onChangeText={(work) => this.setState({work})}>noname</TextInput>
                        </View>
                        <TouchableOpacity onPress={this.setWork}>
                            <View style={{margin: 10}}>
                                <Icon
                                name="create"
                                color={colorIcon}
                                size={15}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'center',}}>
                    <TouchableOpacity style={styles.upButton}>
                        <Text style={styles.CanncelStyles}>Hủy bỏ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.upButton}
                        onPress={this._Logs}>
                        <Text style={styles.SaveStyles}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this._signOutAsync}>
                    <View style={styles.upButton}>
                        <Text style={{marginBottom: 10, color: 'grey'}}> Đăng xuất </Text>
                    </View>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
    _Logs = async () =>{
        Alert.alert(
            "Thông Báo!",
            "Ten la: " + this.state.name,
            [ {
                text: 'ok',
                
                style:'default'
              },
              
            ],
            { cancelable: false }
          );
    }
}




const colorIcon = "#ccc";

const styles = StyleSheet.create({
    CanncelStyles:{
        width: screenWidth/3, 
        height: screenWidth/9, 
        backgroundColor: colors.lightgray, 
        color: colors.gray, 
        borderRadius: 5, 
        margin: 20,
        paddingLeft:screenWidth/9, 
        paddingTop: screenWidth/32, 
    },
    SaveStyles:{
        paddingLeft:screenWidth/8, 
        paddingTop: screenWidth/32,
        width: screenWidth/3, 
        height: screenWidth/9, 
        backgroundColor: '#33CC33', 
        color: 'white', 
        borderRadius: 5,  
        margin: 20
    },
    upButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      },

    ScrollStyles: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f2f5f8'
    },
    ViewRowStyles:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    TextStyles:{
        marginLeft: 10,
        fontSize: 15,
        flex: 1,
        color: colors.gray, 
        marginTop: 10,
    },
    TextTitleStyles:{
        marginLeft: 10,
        fontSize: 15,
        flex: 1,
        color: "black", 
        marginTop: 10,
    },
    textInfor:{
        fontSize: 13,
        marginLeft: 10,
        color: 'blue', 
    },
    viewStyles: {
        borderRadius: 8,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginTop: -30,
    },
    view2ndStyles: {
        borderRadius: 8,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
    },
    ImageIconStyle: {
       height: screenWidth/2.5,
       width: screenWidth,
      },
      LineStyle:{
        flex: 1 ,
        backgroundColor: '#D3D3D3', 
        marginTop: 10, 
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        height: 1
    },
    IconTitleStyle:{
        margin: 15,
    },
});
export default properties;