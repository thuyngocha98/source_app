import React, { Component } from 'React'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,

} from 'react-native'
import Category from './Category'
import { screenWidth } from '../../Common/Dimension'

class CategoryService extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line1}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category // create view image with title
                            image={require('../../../../assets/images/categoryService/Xemvamuacay.png')}
                            title={'Xem và mua cây'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category
                            image={require('../../../../assets/images/categoryService/Chamsoccaytainha.png')}
                            title={'Dịch vụ cây xanh'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category
                            image={require('../../../../assets/images/categoryService/Tuvankhachhang.png')}
                            title={'Tư vấn khách hàng'}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.line2}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category
                            image={require('../../../../assets/images/categoryService/Chatvoichuyengia.png')}
                            title={'Chat với chuyên gia'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category
                            image={require('../../../../assets/images/categoryService/Quatangcayxanh.png')}
                            title={'Quà tặng cây xanh'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Chức năng đang phát triển");
                        }}
                    >
                        <Category
                            image={require('../../../../assets/images/categoryService/Kiguicay.png')}
                            title={'Kí gửi cây'}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

export default CategoryService;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: screenWidth/27.7,
    },
    line1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    line2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});