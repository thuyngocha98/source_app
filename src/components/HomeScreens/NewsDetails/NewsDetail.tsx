import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { screenWidth, screenheight } from '../../Common/Dimension'
import colors from '../../Common/Colors'
import { Buffer } from 'buffer'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    TextInput,
    Dimensions,
    Linking,
    Share,
    Alert
} from 'react-native';
import { datasEvent } from './dataEvent';
import { API } from './vitualAPI'
import HTML from 'react-native-render-html';
import { BASEURL } from '../../../api/api'


type props = { navigation?: any }
type state = {
    ListTree?: [],
    ContentNumber?: number,
    ListContentNumber?: number,
    loading?: boolean,
    content?: any,
    error: null,
    title?: any;
    result?: any,
    link?: string
}

class NewsDetail extends React.Component<props, state>{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true
        }
    }
    states = {
        data: datasEvent,
    }
    itemId = this.props.navigation.getParam('id', ''); // nhận id của bài viết do bên tất cả tin tức chuyển qua

    //Cach 1
    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = BASEURL+`/wp-json/wp/v2/posts/${this.itemId}`; // gọi api lấy để lây dữ liệu
        fetch(url,{
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                if(res.content.rendered !== ''){ // bài viết có dữ liệu
                this.setState({ 
                    content: res.content.rendered,
                    title: res.title.rendered,
                    link: res.link,
                    error: res.error || null,
                    loading: false,

                });
                //this.arrayholder = res.results;
                }
                else{ // khi bài viết ko có dữ liệu
                    this.setState({
                        content: "Bài viết đã bị xóa hoặc link đã bị lỗi!\nVui lòng thử lại sau!",
                        link: res.link,
                        error: res.error || null,
                        loading: false,
                    });
                }
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };


    //share data
    _shareText = () => {
        if(this.state.link!==''){ // khi có dữ liệu bài viết thì chia sẻ
            Share.share({
            message: this.state.link,
            title: 'Chợ cây xanh'
            }, {
            dialogTitle: 'Chia sẻ bài viết của chợ cây xanh',
            tintColor: 'green'
            })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
            }
            else{ // ko có dữ liệu
                
            }
        }
      _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({ result: 'shared with an activityType: ' + result.activityType });
            } else {
                this.setState({ result: 'shared' });
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({ result: 'dismissed' });
        }
    }

    render() {
        return(
                <ScrollView style={styles.viewStyles}>
                { this.state.loading ? <ActivityIndicator/> :<View> 
                    <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}></View>
                            <TouchableOpacity onPress={this._shareText}
                            style={styles.FacebookStyle} activeOpacity={0.5}>
                            <Text numberOfLines={1} style={styles.TextButtonStyle}>Chia sẻ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={styles.titleStyle}>{this.state.title}</Text>
                        </View>
                        <HTML html={this.state.content} //*dùng cái này để show dữ liệu*/
                        imagesMaxWidth={Dimensions.get('window').width - 30} // kích thước tối đa của ảnh
                        ignoredStyles={['width', 'height', 'fontWeight', 'font-family', 'font-weight', 'style']} // bỏ các thuộc tính này 
                        onLinkPress={(event, href) => { // set click khi đó là link
                            Linking.openURL(href)
                        }} />
                    </View>
                    {/*giao diện bình luận bài viết*/}
                    <View style={styles.LineStyle}></View>
                    <TextInput
                        placeholder="Bình luận..."
                        style={styles.inputStyles}></TextInput>
                    <FlatList

                        data={this.states.data.reply}
                        //listKey="1"
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (

                            <View style={{ margin: 5 }}>

                                <View
                                    style={styles.RowMargin}>
                                    <Image style={styles.imgBorderStyles}
                                        source={require('../../../../assets/images/categoryService/facebook.png')}></Image>
                                    <View>
                                        <Text style={styles.TextNameStyle}>{this.states.data.name}</Text>
                                        <Text style={styles.TextCommentStyle}>{this.states.data.time}</Text>
                                    </View>
                                </View>

                                <Text>{item.comment}</Text>


                                <View style={{ marginLeft: 20 }}>
                                    <FlatList
                                        style={{ margin: 10 }}
                                        data={item.rep}
                                        showsVerticalScrollIndicator={false}
                                        // listKey="1.2"
                                        renderItem={({ item }) => (
                                            <View style={{ marginTop: 10 }}>
                                                <View
                                                    style={styles.RowMargin}>
                                                    <Image style={styles.CommentimgStyles}
                                                        source={require('../../../../assets/images/categoryService/facebook.png')}></Image>

                                                    <Text style={styles.TextNameComment}>{this.states.data.name}  -</Text>
                                                    <Text style={styles.TextNameComment}>{this.states.data.time}</Text>

                                                </View>
                                                <Text style={{ marginBottom: 10 }}>{item.repcomment}</Text>


                                            </View>)}
                                        keyExtractor={item => item.idrep.toString()}
                                    />
                                </View>
                                <TextInput
                                    placeholder="Trả lời bình luận..."
                                    style={styles.inputStyles}></TextInput>
                                <View style={styles.LineStyle}></View>
                            </View>)}
                        keyExtractor={item => item.idreply.toString()}
                    />
                </View>}

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    viewStyles: {
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 15,
        flex: 1
    },

    webWiew: {
        width: screenWidth - 80,
        marginBottom: 5,
        height: screenWidth,
    },


    RowMargin: {
        flexDirection: 'row',
        margin: 3,
        textAlign: 'justify'
    },

    imgBorderStyles: {
        borderRadius: 20,
        width: screenWidth / 10.3,
        height: screenWidth / 10.3,
        margin: 6
    },
    CommentimgStyles: {
        borderRadius: 20,
        width: screenWidth / 20.3,
        height: screenWidth / 20.3,
        margin: 6
    },
    inputStyles: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        borderRadius: 20,
        marginTop: 10
    },
    titleStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },

    TextCommentStyle: {
        color: colors.lightgray,
        fontSize: 9,
        marginLeft: 7,
    },
    TextNameStyle: {
        color: 'black',
        marginTop: 7,
        marginLeft: 7,
        fontSize: 13
    },

    TextNameComment: {
        color: 'black',
        marginTop: 6,
        marginLeft: 7,
        fontSize: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },

    FacebookStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#485a96',
        borderColor: '#fff',
        height: 20,
        width: 65,
        borderRadius: 5,
        fontSize: 1
    },
    TextButtonStyle: {
        color: '#fff',
    },
    TagStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#f2f2f2",
        borderColor: '#fff',
        height: 30,
        width: screenWidth / 4,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10,
        borderRadius: 5,
    },
    TextTagStyle: {
        color: "#6f6f6f",
    },
    Tag: {
        color: "#6f6f6f",
        fontSize: 13,
        marginTop: 6,
        marginBottom: 5,
        marginLeft: 5
    },
    LineStyle: {
        flex: 1,
        backgroundColor: '#D3D3D3',
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        height: 1
    },
});
export default connect('', '')(NewsDetail)
