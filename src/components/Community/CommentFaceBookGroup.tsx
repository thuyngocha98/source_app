import React, { Component } from 'react';
import colors from '../Common/Colors'
import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  View, 
  Image,
} from 'react-native';
import { screenWidth } from '../Common/Dimension'
import { datasEvent } from '../HomeScreens/NewsDetails/dataEvent';
import ImageTest from './ListImageCommentFb'
type state = { data?: any[],
    loading?: boolean,
    error?: any,
    values?: string,
    
};
type props = { navigation?: any};


class CommentFaceBookGroup extends React.Component<props, state>{
    state={
        loading: false,
        error: '',
        values: '',
        datas: datasEvent,
    };
   render(){
       return(
        <View>
            <TextInput 
                placeholder="Bình luận..."
                style={styles.inputCommentStyles}></TextInput>
                
                <FlatList 
                
                data = {this.state.datas.reply}
                //listKey="1"
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                
                <View style={{margin:5}}>
                    
                    <View
                        style ={styles.RowMargin}>
                        <Image style={styles.imgBorderStyles}
                            source={require('../../../assets/images/categoryService/facebook.png')
                            
                            }></Image>
                            <View>
                                <Text style={styles.TextNameStyle}>{this.state.datas.name}</Text>
                                <Text style={styles.TextCommentStyle}>{this.state.datas.time}</Text>
                            </View>
                    </View>
                
                    <Text style={{paddingLeft: 20, marginRight: 10}}>{item.comment}</Text>
                    <View style={{marginLeft:20}}>
                        <FlatList 
                            style={{marginLeft: 10}}
                            data = {item.rep}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) =>(
                                <View style={{marginTop: 10}}>
                                    <View
                            style ={styles.RowMargin}>
                            <Image style={styles.CommentimgStyles}
                                source={require('../../../assets/images/categoryService/facebook.png')}></Image>
                            
                                <Text style={styles.TextNameComment}>{this.state.datas.name}  -</Text>
                                <Text style={styles.TextNameComment}>{this.state.datas.time}</Text>
                            
                        </View>
                                <Text style={{marginBottom: 10, fontSize: 13}}>{item.repcomment}</Text>
                                <ImageTest/>
                    </View>)}
                    keyExtractor={item => item.idrep.toString()}
                    /> 
                </View>
                <TextInput 
                    placeholder="Trả lời bình luận..."
                    style={styles.inputStyles}></TextInput>
                </View>)}
                keyExtractor={item => item.idreply.toString()}
                />
                    </View>

    );  
    }
}
const styles = StyleSheet.create({
    imgBorderStyles:{
        borderRadius: 20,
        width: screenWidth/10.3,
        height: screenWidth/10.3,
        margin: 6
    },
    RowMargin:{
        flexDirection: 'row', 
        margin: 3
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
    inputStyles:{
        paddingLeft: 10,
        borderWidth: 0.5, 
        borderColor: '#d6d7da', 
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        marginTop:5
     },
     inputCommentStyles:{
        padding: 5,
        paddingLeft: 5,
        borderWidth: 0.5, 
        borderColor: '#d6d7da', 
        borderRadius: 20,
        marginTop: 10, 
        marginLeft: 10,
        marginRight: 10
     },
      TextNameComment:{
        color: 'black', 
        marginTop: 6,  
        marginLeft: 7,
        fontSize: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CommentimgStyles:{
        borderRadius: 20,
        width: screenWidth/20.3,
        height: screenWidth/20.3,
        margin: 6
    },
});
export default CommentFaceBookGroup;