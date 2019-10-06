import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { screenWidth } from '../Common/Dimension'
import colors from '../Common/Colors'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
type props = {navigation?: any}
class DetailCommunity extends React.Component<props>{
    render(){
        const {params} = this.props.navigation.state;
        return(
            <ScrollView>
            <View style={styles.viewStyles}>
                <Text style={styles.TitleStyles}>Câu hỏi</Text>
                <View style={styles.TextviewStyles}>
                    <Text>{params.describe}</Text>
                    <View style ={styles.RowMargin}>
                    <Text style ={styles.informationStyle} 
                    numberOfLines={1}>{params.name}</Text>
                    <Text style={styles.TextCommentStyle}>
                    {params.time} giờ</Text>
                </View>
                </View>
               
                <Text style={styles.TitleStyles}>Trả lời</Text>
               <View style={styles.TextviewStyles}>
                    <View
                        style ={styles.RowMargin}>
                        <Image style={styles.imgStyles}
                        source={require('../../../assets/images/logo_company.png')}></Image>
                        <View>
                            <Text style={styles.TextNameStyle}>admin</Text>
                            <Text style={styles.TextCommentStyle}>  Giáo sư</Text>
                        </View>
                    </View>
                    <Text>{params.describe}</Text>
                    <View style ={styles.LineStyle}></View>
                        <View style ={{flexDirection: 'row', marginTop: 5}}>
                            <View style={{flex:1}}></View>
                            <Image style={styles.ShareStyle}
                            source={require('../../../assets/images/logo_company.png')}></Image>
                        </View>
                </View>
                <Text style={styles.TitleStyles}>Câu hỏi liên quan</Text>
            </View>
            </ScrollView>
        )
    }
    
    
}

const styles = StyleSheet.create({
    viewStyles:{
        backgroundColor: '#f2f5f8',
        marginBottom: 20,
    },
    ShareStyle:{
        borderRadius: 100, 
        width:10,
        height:10, 
        margin: 6
    },
    LineStyle:{
        flex: 1 ,
        backgroundColor: '#D3D3D3', 
        marginTop: 5, 
        marginLeft: 5,
        marginRight: 5,
        height: 1
    },
    TextviewStyles: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        padding: 10
     },
    TitleStyles: {
        margin: 15, 
        fontSize: 20,
        fontWeight:'bold'
    },
    RowMargin:{
        flexDirection: 'row', 
        margin: 10
    },
    imgStyles:{
        borderRadius: 20,
        width: screenWidth/10.3,
        height: screenWidth/10.3,
        margin: 6
    },
    TextCommentStyle:{
        color: colors.lightgray,
        fontSize:10
    },
    TextNameStyle:{
        color: 'black', 
        marginTop: 7,  
        marginLeft: 7,
        fontSize: 15
    },
    informationStyle:{
        flex: 1,
        color: colors.lightgray, 
        fontSize:10
    },
});
export default connect('', '')(DetailCommunity)
