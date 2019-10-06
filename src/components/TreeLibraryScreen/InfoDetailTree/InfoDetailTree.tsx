import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native'
import colors from '../../Common/Colors';
import ZoomImage from './ZoomImage';
import { screenWidth } from '../../Common/Dimension'
import TableInfoTree from './TableInfoTree';
import DescriptionInfoTree from './DescriptionInfoTree';

type Props = {
    navigation?: any,
}

class DetailsScreen extends React.Component<Props> {
    render() {
        const { navigation } = this.props;
        // receive data
        const sourceImage = navigation.getParam('sourceImage', '');
        const description = navigation.getParam('description', '');
        const infoTree = navigation.getParam('infoTree', '');

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.viewImage}>
                        <ZoomImage sourceImage={sourceImage}/>
                    </View>
                    <View style={styles.viewTableInfo}>
                        <TableInfoTree infoTree={infoTree}/>
                    </View>
                    <View style={styles.viewInfoDetail}>
                        <DescriptionInfoTree description={description}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
    viewImage: {
        height: screenWidth * 0.95,
        margin: screenWidth / 36,
        elevation: 2,
        backgroundColor: colors.background,
        borderRadius: screenWidth / 36,
    },
    viewTableInfo: {
        height: screenWidth / 0.66,
    },
    viewInfoDetail: {
        flex: 1,
    },
});