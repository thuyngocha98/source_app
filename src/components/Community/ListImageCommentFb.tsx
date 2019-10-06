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
import {  SearchBar, Icon } from 'react-native-elements';
import { screenWidth } from '../Common/Dimension'
import { datasEvent } from '../HomeScreens/NewsDetails/dataEvent';
type state = { 
    
};
type props = { navigation?: any};

const data = [
    {
        "link":"https://hatgiongphuongnam.com/asset/upload/image/hat-giong-hoa-hong-1.jpg",
        "idimage": 0,
},
    {
        "link":"https://hatgiongphuongnam.com/asset/upload/image/hat-giong-hoa-hong-1.jpg",
        "idimage": 1,
    },
//     {
//         "link":"https://trello-attachments.s3.amazonaws.com/5d10542c7b946725551823a4/5d2abed95b806a2fe569a634/83fbc0a8a451086d5c7125aebfae5caa/promotion_rose.jpg",
//         "idimage":2,
// },{
//     "link":"https://trello-attachments.s3.amazonaws.com/5d10542c7b946725551823a4/5d2abed95b806a2fe569a634/83fbc0a8a451086d5c7125aebfae5caa/promotion_rose.jpg",
//     "idimage": 3,
// }
]


class ImageTest extends React.Component<props, state>{
    state={
        datas: data,
    };
   render(){
       return(
        <View>                              
            <FlatList 
                horizontal={true}
                style={{margin: 10}}
                data = {this.state.datas}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                    <View>
                        <Image
                        style={{ 
                            width: 100, 
                            height: 100, 
                            marginRight: 5,
                            borderRadius: 5
                        }}
                        source={{uri: item.link}}></Image>
                    </View>)}
            keyExtractor={item => item.idimage.toString()}/> 
                
        </View>

    );  
    }
}
export default ImageTest;