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
} from 'react-native';
import CategorySearch from '../TreeLibraryScreen/CategorySearch'
import { connect } from 'react-redux';
import {datas} from './datas'
import {  SearchBar, Icon } from 'react-native-elements';
import { screenWidth } from '../Common/Dimension'

type state = { data: any[],
    loading?: boolean,
    error?: any,
    values?: string,
    
};
type props = { navigation?: any};

class ListQuestionCommunity extends React.Component<props, state> {
    state={
            data: datas,
            loading: false,
            error: '',
            values: '',
        };
    arrayholder: any;
    searchFilterFunction = text => {
        this.setState({
            values: text,
        });
        

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.ten_cay.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
    scrolldown?: any;
    upButtonHandler = () => {
        //OnCLick of Up button we scrolled the list to top
        this.props.navigation.navigate('Question');
      };

  

    
    render() {
        //const {navigate} = this.props.navigation;
        return(
            <View style={{backgroundColor: '#f2f5f8'}}>
                <FlatList 
                    data = {this.state.data}
                    showsVerticalScrollIndicator={false}
                    
                    renderItem={({item}) =>(
                        <View style={styles.viewStyles}>
                            <TouchableOpacity
                            onPress={
                                ()=> this.props.navigation.navigate('DetailCommunity', {describe: item.dac_diem_hinh_thai, name: item.nguon_goc_xuat_su, time: item.id_danh_muc})
                            }
                            style={styles.TouchableOpacityStyles}>
                                <View style ={{flexDirection: 'row'}} >
                                    <Text numberOfLines={3} style={{color: 'black'}}>{item.dac_diem_hinh_thai}</Text>
                                </View>
                                <View style ={styles.RowMargin}>
                                    <Text style ={styles.informationStyle} 
                                    numberOfLines={1}>{item.nguon_goc_xuat_su}</Text>
                                   
                                    <Text style={styles.TextCommentStyle}>
                                    {item.id_danh_muc} giờ</Text>
                                </View>
                                <View
                                    style ={styles.RowMargin}>
                                    <Image style={styles.imgStyles}
                                        source={require('../../../assets/images/logo_company.png')}></Image>
                                    <View>
                                        <Text style={styles.TextNameStyle}>{item.nguoi_tao}</Text>
                                        <Text style={styles.TextCommentStyle}>  Giáo sư</Text>
                                    </View>
                                </View>
                                    <Text numberOfLines={3} style={{color: 'grey', marginBottom: 15}}>{item.phu_hop_voi}</Text>
                                <View style ={styles.LineStyle}></View>
                                <View style ={{flexDirection: 'row', marginTop: 5}}>
                                    <View style={{flex:1}}></View>
                                    <Image style={styles.ShareStyle}
                                    source={require('../../../assets/images/logo_company.png')}></Image>
                                </View>
                        </TouchableOpacity>
                        </View>)}
                        
                    keyExtractor={item => item .id.toString()}/>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',}}>
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
    TouchableOpacityStyles:{
        padding:10
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
    informationStyle:{
        flex: 1,
        color: colors.lightgray, 
        fontSize:10
    },
    ShareStyle:{
        borderRadius: 100, 
        width:10,
        height:10, 
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
        marginTop: 5, 
        marginLeft: 5,
        marginRight: 5,
        height: 1
    },
    upButton: {
        position: 'absolute',
        width: screenWidth-20,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#33CC33',
        borderRadius: 5
      },
      upButtonImage: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:6,
        marginBottom: 10
      },
});
export default ListQuestionCommunity;
