import React, { Component } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../Common/Colors'
import axios from 'axios';
import ListItems from '../ListItems'
import { screenWidth } from '../../Common/Dimension'
import Category from '../../HomeScreens/CategoryServiceComponent/Category';
import { connect } from 'react-redux'
import { tokenJWT } from '../../../api/tokenApiJWT';
import { BASEURL } from '../../../api/api';

axios.defaults.withCredentials = true


const STATUS_BAR_HEIGHT = 0;

type States = {
    scrollAnim?: any,
    offsetAnim?: any,
    clampedScroll?: any,

    loading?: boolean,
    data?: any[],
    error?: any,
    values?: string,
    isSearching?: boolean,
    dataTemp?: any[],
    emptyProduct?: boolean,
    loadingMore?: boolean,
}
type Props = {
    navigation?: any,
    arrayDataTree?: any[]
}

class SearchTreeScreen extends React.Component<Props, States>{
    constructor(props) {
        super(props);
        this.state = {
            // state for call API
            loading: false,
            data: [],
            error: null,
            dataTemp: [],
            emptyProduct: false,
            loadingMore: false,
            // isRefreshing: false,
            // loadingMore: false,
            // emptyProduct: false,
            // state animation show hide header
        };
    }

    category = 131; // Id category tree
    _isMounted = false; // fix warning cant call setstate on an unmounted component

    arrayData = this.props.arrayDataTree; // data all tree has taken from splashScreen 
    page_number = 1;
    page = 1;

    // GET API 
    _getDataTree(category) {
        this._isMounted = true;
        this.page = 1;
        this.setState({ loading: true, emptyProduct: false });
        fetch(`${BASEURL}/wp-json/wc/v3/products?category=${category}&per_page=30`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + tokenJWT
            }
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

    componentDidMount() {
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // pagination
    _paginate(array, page_size, page_number) {
        if (array.length >= page_size * page_number) {
            this.setState({
                data: [...this.state.data, ...array.slice(page_number * page_size, (page_number + 1) * page_size - 1)],
            })
        }
    }

    searchFilterFunction = text => {
        this.page_number = 1;
        this.setState({
            values: text,
        });
        text != '' ? this.setState({ isSearching: true }) : this.setState({ isSearching: false })

        const newData = this.arrayData.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            dataTemp: newData,
            data: newData.slice(0, 9),
        })
    };

    onResizeImage(url, dimension) {
        var urlpng = url.replace(".png", `-${dimension}.png`);
        var urljpg = urlpng.replace(".jpg", `-${dimension}.jpg`);
        return urljpg.replace(".gif", `-${dimension}.gif`);
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleLoadMore = async () => {
        this.page_number++;
        await this.sleep(250);
        this._paginate(this.state.dataTemp, 10, this.page_number)
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.containerMain}>
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Tìm tên cây..."
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
                    />
                </View>
                <View style={{ flex: 1 }}>{this.state.loading ? (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator animating size="large" color={colors.green} />
                    </View>
                ) : (
                        <View style={{ flex: 1 }}>{this.state.isSearching ? (
                            <View style={styles.listItem}>
                                <FlatList
                                    data={this.state.data}
                                    removeClippedSubviews={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigate('InfoDetailTree', {
                                                    sourceImage: this.onSendImageTree(item.images, item.name),
                                                    description: item.description,
                                                    infoTree: this.onSelectInfoTree(item.meta_data)
                                                })
                                            }}
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
                                    onEndReachedThreshold={0.4}
                                    onEndReached={this.handleLoadMore.bind(this)}
                                />
                            </View>
                        ) : (
                                <ScrollView >
                                    <View style={styles.containerCategory}>
                                        <View style={styles.line1}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây văn phòng')
                                                    this.category = 131
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category // create view image with title
                                                    image={require('../../../../assets/images/SearchCategory/CAYVANPHONG.png')}
                                                    title={'Cây văn phòng'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây trong nhà')
                                                    this.category = 129
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category
                                                    image={require('../../../../assets/images/SearchCategory/CAYTRONGNHA.png')}
                                                    title={'Cây trong nhà'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây sân vườn')
                                                    this.category = 125
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category
                                                    image={require('../../../../assets/images/SearchCategory/CAYSANVUON.png')}
                                                    title={'Cây sân vườn'}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.line2}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây công trình')
                                                    this.category = 109
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category
                                                    image={require('../../../../assets/images/SearchCategory/CAYCONGTRINH.png')}
                                                    title={'Cây công trình'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây phong thủy')
                                                    this.category = 119
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category
                                                    image={require('../../../../assets/images/SearchCategory/CAYPHONGTHUY.png')}
                                                    title={'Cây phong thủy'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.searchFilterFunction('Cây giàn leo')
                                                    this.category = 112
                                                    this._getDataTree(this.category)
                                                }}
                                            >
                                                <Category
                                                    image={require('../../../../assets/images/SearchCategory/CAYGIANLEO.png')}
                                                    title={'Cây giàn leo'}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            )}
                        </View>
                    )}</View>
            </View>
        );
    }
}

// Lấy data thông tin cây đã get về từ màn hình splash
const mapStateToProps = state => {
    return {
        arrayDataTree: state.getApiForSearch.data
    }
}
export default connect(mapStateToProps, null)(SearchTreeScreen)

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    container: {
        backgroundColor: colors.white
    },
    input: {
        width: screenWidth / 2.2,
        height: screenWidth / 9,
        fontSize: 16,
        color: colors.black
    },
    containerInput: {
        backgroundColor: colors.background,
        borderRadius: screenWidth / 18,
        elevation: 0,
    },
    containerSearchbar: {
        marginHorizontal: screenWidth / 120,
        height: screenWidth / 4,
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.white,
    },
    listItem: {
        backgroundColor: colors.background,
    },
    containerCategory: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: screenWidth / 27.7,
        backgroundColor: colors.background
    },
    line1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    line2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background
    },

});