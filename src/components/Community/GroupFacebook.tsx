import React, { Component } from 'react';
import colors from '../Common/Colors'
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  View, 
  Image,
  Alert,
  ScrollView,
  LayoutAnimation
} from 'react-native';
import CategorySearch from '../TreeLibraryScreen/CategorySearch'
import { connect } from 'react-redux';
import {datas} from './datas'
import {  SearchBar, Icon } from 'react-native-elements';
import { screenWidth } from '../Common/Dimension'
import { datasEvent } from '../HomeScreens/NewsDetails/dataEvent';
import CommentFaceBookGroup from './CommentFaceBookGroup'
import ImageTest from './ListImageCommentFb';

type state = { data: any[],
    loading?: boolean,
    error?: any,
    values?: string,
    isActionButtonVisible?: boolean
    
};
type props = { navigation?: any};

class GroupFacebook extends React.Component<props, state> {
    state={
        data: datas,
        loading: false,
        error: '',
        values: '',
        datas: datasEvent,
        isActionButtonVisible: true,
        };
  
    upButtonHandler = () => {
        //OnCLick of Up button we scrolled the list to top
        this.props.navigation.navigate('Question');
      };

  
    
    render() {
        //const {navigate} = this.props.navigation;
        const colorIcon = "#ccc";
        return(
            <View style={{backgroundColor: '#f2f5f8', marginBottom: 10}}>
                <FlatList 
                    data = {this.state.data}
                    showsVerticalScrollIndicator={false}
                    listKey = '1'
                    renderItem={({item}) =>(
                        <View style={styles.viewStyles}>
                            <View
                                style ={styles.RowMargin}>
                                <Image style={styles.imgStyles}
                                    source={require('../../../assets/images/logo_company.png')}></Image>
                                <View>
                                    <Text style={styles.TextNameStyle}>{item.nguoi_tao}</Text>
                                    <Text style={styles.TextCommentStyle}>  Giáo sư</Text>
                                </View>
                            </View>
                                <Text style={{padding: 10, color: '#5C5858', marginBottom: 15}}>{item.phu_hop_voi}</Text>
                                {/* <FlatList 
                                    numColumns={3}
                                    style={{margin: 10}}
                                    data = {this.state.datas1}
                                    listKey = '1.1'
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) =>(
                                        <View>
                                            <Image
                                            style={{ 
                                                width: 100, 
                                                height: 100, 
                                                marginRight: 5
                                            }}
                                            source={{uri: item.link}}></Image>
                                        </View>)}
                                keyExtractor={item => item.idimage.toString()}/>  */}
                                <ImageTest/>
                                <View style ={styles.LineStyle}></View>
                            <View style ={{flexDirection: 'row', marginTop: 5}}>
                                <View style ={{flexDirection: 'row', margin: 5, paddingLeft: 20, flex: 1}}>
                                    <Icon
                                            name="thumb-up"
                                            color={colorIcon}
                                            size={17}/>
                                    <Text style={styles.TextIconStyle}>  Thích</Text>
                                </View>
                                <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                                    <Icon
                                        name="chat"
                                        color={colorIcon}
                                        size={17}/>
                                    <Text style={styles.TextIconStyle}>  Bình luận</Text>
                                </View>
                                <View style ={{flexDirection: 'row', margin: 5, flex: 1}}>
                                    <Icon
                                        name="share"
                                        color={colorIcon}
                                        size={17}/>
                                    <Text style={styles.TextIconStyle}>  Chia sẻ</Text>
                                </View>
                            </View>
                            <View style ={styles.LineStyle}></View>
                             <CommentFaceBookGroup/>
                             {/* {this.state.isActionButtonVisible ?  <View 
                             style={{
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                position: 'absolute',}}>
                                <TouchableOpacity
                                    onPress={this.upButtonHandler}
                                    style={styles.upButton}>
                                    <Text style={styles.upButtonImage}>Đặt câu hỏi</Text>
                                </TouchableOpacity>
                            </View>  : null} */}
                            </View>)}
                        
                    keyExtractor={item => item .id.toString()}/>
                    <View>
                <View style ={styles.LineStyle}></View>
               
                             
                             
                </View>
                   <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                            onPress={this.upButtonHandler}
                            style={styles.upButton}>
                            <Text style={styles.upButtonImage}>Đặt câu hỏi</Text>
                        </TouchableOpacity>
                    </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
   
    viewStyles: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
    },
    RowMargin:{
        flexDirection: 'row', 
        margin: 3
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
    LineStyle:{
        flex: 1 ,
        backgroundColor: '#D3D3D3',
        margin: 5,
        height: 1
    },
    TextIconStyle:{
        fontSize: 13, 
        paddingBottom: 3, 
        color: 'grey'},
    upButton: {
        position: 'absolute',
        width: screenWidth-20,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#33CC33',
        borderRadius: 5,
      },
      upButtonImage: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:6,
        marginBottom: 10
      },
});
export default GroupFacebook;
