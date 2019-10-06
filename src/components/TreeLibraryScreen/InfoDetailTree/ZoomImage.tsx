import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import ImageView from 'react-native-image-view';
import Swiper from 'react-native-swiper'
import colors from '../../Common/Colors';
import { screenWidth } from '../../Common/Dimension'

type States = {
    isImageViewVisible?: boolean,
    imageIndex?: number,
}

type Props = {
    sourceImage?: any[], // receive list url image
}

export default class ZoomImage extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.renderFooter = this.renderFooter.bind(this);
    }
    state = {
        imageIndex: 0,
        isImageViewVisible: false,
    };

    renderFooter({ title }) {
        return (
            <View style={styles.footer}>
                <Text style={styles.footerText}>{title}</Text>
            </View>
        );
    }

    render() {
        const { isImageViewVisible, imageIndex } = this.state;
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} // Create slide image tree
                    onMomentumScrollEnd={(e, state, context) => this.setState({ imageIndex: state.index })}
                    dot={<View style={{ backgroundColor: colors.gray, width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    activeDot={<View style={{ backgroundColor: colors.green, width: screenWidth / 45, height: screenWidth / 45, borderRadius: screenWidth / 90, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
                    paginationStyle={{
                        bottom: -screenWidth / 18, justifyContent: 'center'
                    }} loop>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ isImageViewVisible: true })
                        }}
                    >
                        <View style={styles.slide} >
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={this.props.sourceImage[0].source}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ isImageViewVisible: true })
                        }}
                    >
                        <View style={styles.slide} >
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={this.props.sourceImage[1] ? this.props.sourceImage[1].source : { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ isImageViewVisible: true })
                        }}
                    >
                        <View style={styles.slide} >
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={this.props.sourceImage[2] ? this.props.sourceImage[2].source : { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" }} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({ isImageViewVisible: true })
                        }}
                    >
                        <View style={styles.slide} >
                            <Image
                                resizeMode='contain'
                                style={styles.image}
                                source={this.props.sourceImage[3] ? this.props.sourceImage[3].source : { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" }} />
                        </View>
                    </TouchableOpacity>
                </Swiper>
                <ImageView  // Zoom image tree
                    // glideAlways
                    images={this.props.sourceImage}
                    imageIndex={imageIndex}
                    animationType="fade"
                    isVisible={isImageViewVisible}
                    renderFooter={this.renderFooter}
                    onClose={() => this.setState({ isImageViewVisible: false })}
                    onImageChange={index => {
                        //console.log(index);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        width: screenWidth,
        height: screenWidth / 7.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingHorizontal: screenWidth / 36,
        paddingVertical: screenWidth / 72,
    },
    footerText: {
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    },
    wrapper: {
        height: screenWidth * 0.95,
    },
    slide: {
        alignItems: 'center',
    },
    image: {
        width: screenWidth * 0.95,
        height: screenWidth * 0.95,
        alignSelf: 'center',
        borderRadius: screenWidth / 72,
    }
});

