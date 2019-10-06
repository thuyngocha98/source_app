import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Platform,
    Alert,

} from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { sliderWidth } from '../Common/Dimension'
import colors from '../Common/Colors'

const SLIDER_1_FIRST_ITEM = 0;


export default class HomeSlide extends Component {
    slider1ActiveSlide: any;
    state = {
        slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };

    // render Image in slide
    _renderItem({ item, index }, parallaxProps) {
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        Alert.alert("Chức năng đang phát triển");
                    }} >
                    <ParallaxImage
                        source={item.illustration}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        parallaxFactor={0.4}
                        {...parallaxProps}
                    />
                </TouchableOpacity>

            </View>
        );
    }

    // create slide 
    mainView() {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                <Carousel  // create slide with image
                    
                    data={ENTRIES1}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={sliderWidth * (8 / 9)}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    // loop={true}
                    // loopClonesPerSide={2}
                    removeClippedSubviews={true}
                    // enableMomentum={false}
                    // lockScrollWhileSnapping={true}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
                <Pagination // create dot under image
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={colors.green}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        );
    }

    render() {
        const showViewMain = this.mainView();
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <LinearGradient // create gradient background color
                        colors={[colors.green, colors.background]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 200,
                        }}
                    />
                    {showViewMain}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    exampleContainer: {
        flexDirection: 'column',
        paddingVertical: 5,
    },
    slider: {
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingTop: 5,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    item: {
        width: sliderWidth * (8 / 9),
        height: (sliderWidth * (8 / 9)) / 1.7,
    },
    imageContainer: {
        height: (sliderWidth * (8 / 9)) / 1.7,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: colors.white,
        borderRadius: 8,
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
});

// Data
const ENTRIES1 = [
    {
        title: 'Free ship nội thành',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: require('../../../assets/images/HomeSlide/freeshipnoithanh.jpg')

    },
    {
        title: 'Mua hoa hồng leo tặng thuốc',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: require('../../../assets/images/HomeSlide/hongleotangthuoc.jpg')
    },
    {
        title: 'Trồng cây bảo vệ môi trường',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: require('../../../assets/images/HomeSlide/trongcaybaovemoitruong.jpg')
    },
];

