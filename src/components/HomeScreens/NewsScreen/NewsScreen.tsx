import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'
import ListItemNews from './ListItemNews';
import colors from '../../Common/Colors';
import { SearchBar } from 'react-native-elements';
import { screenWidth } from '../../Common/Dimension';
import { BASEURL } from '../../../api/api';

const NAVBAR_HEIGHT = screenWidth / 4.5;
const STATUS_BAR_HEIGHT = 0;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList); // create animation

type States = {
    scrollAnim?: any,
    offsetAnim?: any,
    clampedScroll?: any,

    values?: string, // value of text in searchbar
    loading?: boolean, // use when call api
    data?: any[], // data of flatlist
    error?: any,
    isRefreshing?: boolean,
    loadingMore?: boolean,
    emptyProduct?: boolean,
    isSearch?: boolean,
}

type Props = {
    navigation?: any,
}

export default class NewsScreen extends Component<Props, States> {

    constructor(props) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            // state for call API
            loading: false,
            data: [],
            error: null,
            values: "",

            isRefreshing: false,
            loadingMore: false,
            emptyProduct: false,
            isSearch: false,
            // state animation show hide header
            scrollAnim,
            offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                    }),
                    offsetAnim,
                ),
                0,
                NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
            ),

        };
    }

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    _scrollEndTimer

    page = 1;
    listItemSearch = [];
    _isMounted = false; // fix warning cant call setstate on an unmounted component

    // GET API NEWS FIRST PAGE
    _getDataNews() {
        this.setState({ loading: true, emptyProduct: false });
        fetch(`${BASEURL}/wp-json/wp/v2/posts?_embed&page=1`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        data: response,
                        error: response.error || null,
                        loading: false,
                    });
                }
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    //GET LOAD MORE 
    _getDataLoadMore(page) {
        this._isMounted = true;
        this.setState({ loadingMore: true });
        fetch(`${BASEURL}/wp-json/wp/v2/posts?_embed&page=${page}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then(response => {
                if (response == "") {
                    this.setState({ emptyProduct: true })
                }
                this.setState({
                    data: [...this.state.data, ...response],
                    error: response.error || null,
                    loadingMore: false,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    // Get Api id item news when search
    async _getApiSearch(text) {
        this._isMounted = true;
        this.listItemSearch = [];
        this.setState({ loading: true, isSearch: true });
        await fetch(`${BASEURL}/wp-json/wp/v2/search?search=${text}&per_page=5`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then(response => {
                this.listItemSearch = response;
                this.setState({
                    error: response.error || null,
                    loading: false,
                    isSearch: false,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, isSearch: false });
            });
    }

    _configUrlItemSearch(array: any[]) {
        let i;
        var listURL = [];
        for (i = 0; i < array.length; i++) {
            listURL.push(`${BASEURL}/wp-json/wp/v2/posts/${array[i].id}?_embed`)
        }
        return listURL;
    }

    // Get Api content item news
    async _getContentItemNews() {
        this._isMounted = true;
        var array = [];
        this.setState({ loading: true, isSearch: true });

        var urls = this._configUrlItemSearch(this.listItemSearch)
        await Promise.all(
            urls.map(url =>
                fetch(url, {
                    method: "GET",
                })
                    .then(res => res.json())
                    .then(res => res)

            )
        ).then(res => {
            // lọc ra những bài tin tức lỗi, đã bị xóa mà vẫn còn id.
            const newData = res.filter(item => {
                return typeof (item.id) === "number";
            });
            array = [].concat(...newData)
        });
        this.setState({
            data: array,
            loading: false,
            isSearch: false,
        })
    }

    handleLoadMore = () => {
        if (!this.state.loadingMore && !this.state.emptyProduct && this.state.values == "") {
            this.page = this.page + 1; // increase page by 1
            this._getDataLoadMore(this.page); // method for API call 
        }
    };
    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loadingMore && this.state.values != "") return null;
        return (
            <ActivityIndicator size="large" color={colors.green} />
        );
    };
    onRefresh() {
        this._getDataNews();
    }

    componentDidMount() {
        this._isMounted = true;
        this._getDataNews();
        // state when croll flatlist
        this.state.scrollAnim.addListener(({ value }) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
            this._clampedScrollValue = Math.min(
                Math.max(this._clampedScrollValue + diff, 0),
                NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
            );
        });
        this.state.offsetAnim.addListener(({ value }) => {
            this._offsetValue = value;
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
    };

    _onMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _onMomentumScrollEnd = () => {
        const toValue = this._scrollValue > NAVBAR_HEIGHT &&
            this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
            ? this._offsetValue + NAVBAR_HEIGHT
            : this._offsetValue - NAVBAR_HEIGHT;

        Animated.timing(this.state.offsetAnim, {
            toValue,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    searchFilterFunction = text => {
        this.setState({
            values: text,
        });
    };

    async onSubmitForSearch() {
        await this._getApiSearch(this.state.values);
        await this._getContentItemNews();
    }

    onFormatDate(date) {
        return date.replace("T", " ");
    }

    render() {

        const { clampedScroll } = this.state;

        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
            extrapolate: 'clamp',
        });
        const navbarOpacity = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.containerMain}>
                <Animated.View style={styles.viewListItem}>{this.state.loading ? (
                    <Animated.View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={colors.green} />
                    </Animated.View>
                ) : (
                        <Animated.View style={styles.listItem}>
                            <AnimatedFlatlist
                                data={this.state.data}
                                removeClippedSubviews={true}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                        progressViewOffset={screenWidth / 4}
                                    />
                                }
                                extraData={this.state}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate("NewsDetail",{id: item.id})
                                        }
                                    >
                                        <ListItemNews
                                            urlImage={item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                                                : "http://image4.photobiz.com/1841/7_20171212102300_10275181_large.jpg"}
                                            title={item.title.rendered}
                                            date={this.onFormatDate(item.date)}
                                        />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id ? item.id.toString() : null}
                                
                                contentContainerStyle={styles.contentContainer}
                                scrollEventThrottle={1}
                                initialNumToRender={4}
                                onMomentumScrollBegin={this._onMomentumScrollBegin}
                                onMomentumScrollEnd={this._onMomentumScrollEnd}
                                onScrollEndDrag={this._onScrollEndDrag}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
                                    { useNativeDriver: true },
                                )}
                                onEndReachedThreshold={0.4}
                                onEndReached={this.handleLoadMore.bind(this)}
                                ListFooterComponent={this.renderFooter.bind(this)}
                            />
                        </Animated.View>
                    )
                }</Animated.View>
                <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
                    <Animated.View style={{ opacity: navbarOpacity }}>
                        <View style={styles.header}>
                            <SearchBar
                                placeholder="Tìm kiếm"
                                lightTheme
                                clearIcon={{ size: 24, name: 'clear' }}
                                round={true}
                                searchIcon={{ size: 26, name: 'search' }}
                                onChangeText={text => this.searchFilterFunction(text)}
                                autoCorrect={false}
                                value={this.state.values}
                                inputStyle={styles.input}
                                inputContainerStyle={styles.containerInput}
                                containerStyle={styles.containerSearchbar}
                                onSubmitEditing={() => { this.onSubmitForSearch() }}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    input: {
        width: screenWidth / 2.2,
        height: screenWidth / 9,
        fontSize: 16,
        color: colors.black
    },
    containerInput: {
        width: screenWidth / 1.13,
        backgroundColor: colors.background,
        borderRadius: screenWidth / 18,
        elevation: 0,
    },
    containerSearchbar: {
        marginHorizontal: screenWidth / 120,
        height: screenWidth / 4.5,
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.white,
    },
    listItem: {
        backgroundColor: colors.background
    },
    containerCategory: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: screenWidth / 27.7,
        backgroundColor: colors.background
    },
    navbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    contentContainer: {
        paddingTop: NAVBAR_HEIGHT + screenWidth / 36,
        paddingBottom: screenWidth / 36
    },
    header: {
        height: screenWidth / 4.5,
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.white
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    viewListItem: {
        flex: 1,
        backgroundColor: colors.background
    }
});

