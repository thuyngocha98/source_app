import React, { Component } from 'react'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import colors from '../Common/Colors';
import HomeSlide from './HomeSlideComponent';
import CategoryService from './CategoryServiceComponent/CategoryServiceComponent';
import FeaturedNews from './FeaturedNewsComponent/FeaturedNewsComponent';
import { screenWidth } from '../Common/Dimension';

type Props = {
    navigation?: any,
}
export default class ScreenHome extends Component<Props>{
    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.slideAdvertisement}>
                        <HomeSlide />
                    </View>
                    <View style={styles.categoryService}>
                        <CategoryService />
                    </View>
                    <View style={styles.featuredNews}>
                        <FeaturedNews navigation={this.props.navigation} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    contentContainer: {

    },
    slideAdvertisement: {
        height: screenWidth / 1.55,
        backgroundColor: colors.background
    },
    categoryService: {
        height: screenWidth / 1.5,
        backgroundColor: colors.background
    },
    featuredNews: {
        backgroundColor: colors.background
    }
});
