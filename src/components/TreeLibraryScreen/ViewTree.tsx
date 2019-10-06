import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Animated,
    RefreshControl,
} from 'react-native';
import colors from '../Common/Colors'
import CategorySearch from './CategorySearch'
import axios from 'axios';
import ListItems from './ListItems'
import { screenWidth } from '../Common/Dimension'
import { tokenJWT } from '../../api/tokenApiJWT';
import { BASEURL } from '../../api/api';


axios.defaults.withCredentials = true


const NAVBAR_HEIGHT = screenWidth / 4;
const STATUS_BAR_HEIGHT = 0;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList); // create animation


type States = {
    scrollAnim?: any,
    offsetAnim?: any,
    clampedScroll?: any,

    loading?: boolean,
    data?: any[],
    error?: any,
    selectedItem?: number,
    isRefreshing?: boolean,
    loadingMore?: boolean,
    emptyProduct?: boolean,
}

type Props = {
    navigation?: any,
}


export default class ViewTree extends Component<Props, States> {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);


        this.state = {
            // state for call API
            loading: false,
            data: [],
            error: null,

            isRefreshing: false,
            loadingMore: false,
            emptyProduct: false,
            // state get id in flatlist when click item category search
            selectedItem: 1,
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

    flatListRef: any;
    category = 131;
    page = 1;

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    _scrollEndTimer



    // GET API 
    _getDataTree(category) {
        this.page = 1;
        this.setState({ loading: true, emptyProduct: false });
        fetch(`${BASEURL}/wp-json/wc/v3/products?category=${category}&page=1`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + tokenJWT
            }
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

    //GET LOAD MORE
    _getDataLoadMore(category, page) {
        this.setState({ loadingMore: true });
        fetch(`${BASEURL}/wp-json/wc/v3/products?category=${category}&page=${page}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + tokenJWT
            }
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

    handleLoadMore = () => {
        if (!this.state.loadingMore && !this.state.emptyProduct) {
            this.page = this.page + 1; // increase page by 1
            this._getDataLoadMore(this.category, this.page); // method for API call 
        }
    };
    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loadingMore) return null;
        return (
            <ActivityIndicator animating size="large" color={colors.green} />
        );
    };
    onRefresh() {
        this._getDataTree(this.category);
    }


    componentDidMount() {
        this._getDataTree(this.category);
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

    scrollToIndex = (index) => {
        this.flatListRef.scrollToIndex({ animated: true, index: index, viewPosition: 0.5 });
    }

    onPressHandler(id) {
        this.setState({ selectedItem: id });
    }

    onStripTag(description) {
        const regex = /(<([^>]+)>)/ig;
        const regex1 = description.replace(regex, '');
        return regex1.replace("\n", '');
    }

    onSelectInfoTree(infoTree) {
        var tenkhoahoc = null;
        var tenphothong = null;
        var hothucvat = null;
        var nguongoc = null;
        var sinhtruong = null;
        var phanbo = null;
        var i;
        for (i = 0; i < infoTree.length; i++) {
            if (infoTree[i].key == 'ten_khoa_hoc') {
                tenkhoahoc = infoTree[i].value;
                continue;
            }
            if (infoTree[i].key == 'ten_pho_thong') {
                tenphothong = infoTree[i].value;
                continue;
            }
            if (infoTree[i].key == 'ho_thuc_vat') {
                hothucvat = infoTree[i].value;
                continue
            }
            if (infoTree[i].key == 'nguon_goc_xuat_xu') {
                nguongoc = infoTree[i].value;
                continue;
            }
            if (infoTree[i].key == 'toc_do_sinh_truong') {
                sinhtruong = infoTree[i].value;
                continue;
            }
            if (infoTree[i].key == 'phan_bo_o_viet_nam') {
                phanbo = infoTree[i].value;
                continue;
            }
            if (tenkhoahoc != null && tenphothong != null && hothucvat != null && nguongoc != null && sinhtruong != null && phanbo != null) {
                break;
            }
        }

        let array = [tenkhoahoc, tenphothong, hothucvat, nguongoc, sinhtruong, phanbo]
        return array;
    }

    onSendImageTree(sourceImage, name) {
        var image = {}, SourceImage = [];
        var i;
        for (i = 0; i < sourceImage.length; i++) {
            var uri = this.onResizeImage(sourceImage[i].src, "600x600")
            image = {
                id: i,
                title: name,
                source: {
                    uri: uri
                }
            }
            SourceImage.push(image);
        }

        return SourceImage;
    }

    onResizeImage(url, dimension) {
        var urlpng = url.replace(".png", `-${dimension}.png`);
        var urljpg = urlpng.replace(".jpg", `-${dimension}.jpg`);
        return urljpg.replace(".gif", `-${dimension}.gif`);
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
            <View style={styles.container}>
                <Animated.View style={styles.viewListItem}>{this.state.loading ? (
                    <Animated.View style={styles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={colors.green} />
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
                                            navigate('InfoDetailTree', {
                                                sourceImage: this.onSendImageTree(item.images, item.name),
                                                description: item.description,
                                                infoTree: this.onSelectInfoTree(item.meta_data)
                                            })
                                        }
                                    >
                                        <ListItems
                                            img={this.onResizeImage(item.images[0].src, "150x150")}
                                            title={item.name}
                                            description={this.onStripTag(item.description)}
                                        />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id.toString()}
                                initialNumToRender={4}
                                contentContainerStyle={styles.contentContainer}
                                scrollEventThrottle={1}
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
                            <FlatList
                                extraData={this.state.selectedItem}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ref={(ref) => { this.flatListRef = ref; }}
                                data={DataHeader}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.scrollToIndex(item.id)
                                            item.title != 'Tìm kiếm' ? this.onPressHandler(item.id) : (navigate('SearchTreeScreen'))
                                            switch (item.title) {
                                                case 'Cây văn phòng': {
                                                    this.category = 131
                                                    this._getDataTree(this.category)
                                                    break;
                                                }
                                                case 'Cây trong nhà': {
                                                    this.category = 129
                                                    this._getDataTree(this.category)
                                                    break;
                                                }
                                                case 'Cây sân vườn': {
                                                    this.category = 125
                                                    this._getDataTree(this.category)
                                                    break;
                                                }
                                                case 'Cây công trình': {
                                                    this.category = 109
                                                    this._getDataTree(this.category)
                                                    break;
                                                }
                                                case 'Cây phong thủy': {
                                                    this.category = 119
                                                    this._getDataTree(this.category)
                                                    break;
                                                }
                                                case 'Cây giàn leo': {
                                                    this.category = 112
                                                    this._getDataTree(this.category)
                                                    break;
                                                }

                                            }
                                        }}
                                    >
                                        <CategorySearch
                                            styleImage={this.state.selectedItem === item.id ? {
                                                tintColor: colors.green,
                                                width: screenWidth / 8,
                                                height: screenWidth / 8,
                                                alignContent: 'center'
                                            } : {
                                                    tintColor: '#ccc',
                                                    width: screenWidth / 9,
                                                    height: screenWidth / 9,
                                                    alignContent: 'center'
                                                }}
                                            styleText={this.state.selectedItem === item.id ? {
                                                fontSize: 10,
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                color: colors.green
                                            } : {
                                                    fontSize: 9,
                                                    textAlign: 'center',
                                                    fontWeight: '600',
                                                }}
                                            image={item.image}
                                            title={item.title} />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: screenWidth / 4,
        justifyContent: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderBottomColor: colors.white
    },
    listItem: {
        flex: 1,
        backgroundColor: colors.background,
    },
    activityIndicator: {
        flex: 1,
        marginTop: screenWidth / 2 - screenWidth / 4,
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    viewListItem: {
        flex: 1,
        backgroundColor: colors.background
    }
});

const DataHeader = [
    {
        id: 0,
        image: require('../../../assets/images/categoryService/iconSearch.png'),
        title: 'Tìm kiếm',
    },
    {
        id: 1,
        image: require('../../../assets/images/SearchCategory/CAYVANPHONG.png'),
        title: 'Cây văn phòng'
    },
    {
        id: 2,
        image: require('../../../assets/images/SearchCategory/CAYTRONGNHA.png'),
        title: 'Cây trong nhà'
    },
    {
        id: 3,
        image: require('../../../assets/images/SearchCategory/CAYSANVUON.png'),
        title: 'Cây sân vườn'
    },
    {
        id: 4,
        image: require('../../../assets/images/SearchCategory/CAYCONGTRINH.png'),
        title: 'Cây công trình'
    },
    {
        id: 5,
        image: require('../../../assets/images/SearchCategory/CAYPHONGTHUY.png'),
        title: 'Cây phong thủy'
    },
    {
        id: 6,
        image: require('../../../assets/images/SearchCategory/CAYGIANLEO.png'),
        title: 'Cây giàn leo'
    },

]