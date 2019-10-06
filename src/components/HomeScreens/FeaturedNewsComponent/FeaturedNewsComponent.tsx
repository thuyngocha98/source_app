import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { sliderWidth, screenWidth } from '../../Common/Dimension';
import colors from '../../Common/Colors';
import ListItemTopNews from './ListItemTopNews';
import ListItemBottomNews from './ListItemBottomNews';
import { BASEURL } from '../../../api/api';

type States = {
    data?: any[],
    loading?: boolean,
    error?: any,
}

type Props = {
    navigation?: any,
}

export default class FeaturedNews extends Component<Props, States>{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
            error: null,
        }
    }
    // GET API 
    _getData5News() {
        this.setState({ loading: true });
        fetch(`${BASEURL}/wp-json/wp/v2/posts?_embed&per_page=5`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then(response => {
                this.setState({
                    data: response,
                    error: response.error || null,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }


    componentDidMount() {
        this._getData5News();
    }

    onFormatDate(date) {
        return date.replace("T", " ");
    }

    render() {
        if (this.state.loading)
            return (
                <View style={styles.container}>
                    <View style={styles.viewText}>
                        <Text style={styles.textFeaturedNews}>Tin tức nổi bật</Text>
                        <Text style={styles.textall}>Xem tất cả >></Text>
                    </View>
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={colors.green} />
                    </View>
                </View>
            )
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={styles.textFeaturedNews}>Tin tức nổi bật</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('NewsScreen')
                        }}
                    >
                        <Text style={styles.textall}>Xem tất cả >></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.topnews}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("NewsDetail", { id: this.state.data[0].id })
                        }}
                    >
                        <ListItemTopNews
                            image={this.state.data[0]._embedded['wp:featuredmedia'] ? this.state.data[0]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                            title={this.state.data[0].title.rendered}
                            date={this.onFormatDate(this.state.data[0].date)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomnews}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("NewsDetail", { id: this.state.data[1].id })
                        }}
                    >
                        <ListItemBottomNews
                            image={this.state.data[1]._embedded['wp:featuredmedia'] ? this.state.data[1]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                            title={this.state.data[1].title.rendered}
                            date={this.onFormatDate(this.state.data[1].date)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("NewsDetail", { id: this.state.data[2].id })
                        }}
                    >
                        <ListItemBottomNews
                            image={this.state.data[2]._embedded['wp:featuredmedia'] ? this.state.data[2]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                            title={this.state.data[2].title.rendered}
                            date={this.onFormatDate(this.state.data[2].date)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomnews}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("NewsDetail", { id: this.state.data[3].id })
                        }}
                    >
                        <ListItemBottomNews
                            image={this.state.data[3]._embedded['wp:featuredmedia'] ? this.state.data[3]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                            title={this.state.data[3].title.rendered}
                            date={this.onFormatDate(this.state.data[3].date)}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigate("NewsDetail", { id: this.state.data[4].id })
                        }}
                    >
                        <ListItemBottomNews
                            image={this.state.data[4]._embedded['wp:featuredmedia'] ? this.state.data[4]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                            title={this.state.data[4].title.rendered}
                            date={this.onFormatDate(this.state.data[4].date)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    viewText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: sliderWidth / 36,
        marginBottom: screenWidth / 36,
    },
    textFeaturedNews: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textall: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    topnews: {

    },
    bottomnews: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: screenWidth / 36,
    },
    activityIndicator: {
        flex: 1,
        marginVertical: 10,
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    viewListItem: {
        flex: 1,
        backgroundColor: colors.background
    }
});