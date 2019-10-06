import React, { Component } from 'react';
import {
    Dimensions,
    View
} from 'react-native';
import HTML from 'react-native-render-html';

type Props = {
    description?: string,
}

export default class DescriptionInfoTree extends Component<Props> {

        htmlEntity = this.props.description;
        // decode html entity
        Entities = require('html-entities').XmlEntities;
        entities = new this.Entities();
        html = this.entities.decode(this.htmlEntity);

    render() {
        // remove Font in code html
        const regex = /(font-family([^;]+);)/ig; 
        const htmlContent = this.html.replace(regex, '');
        return (
            <View style={{ margin: 10, alignSelf: 'baseline' }} >
                <HTML html={htmlContent} 
                    imagesMaxWidth={Dimensions.get('window').width - 20}
                    baseFontStyle={{ fontSize: 16 }} 
                    // resize image 
                    imagesInitialDimensions={{ width: Dimensions.get('window').width - 20, height: Dimensions.get('window').width - 20}}
                />
            </View>
        );
    }
}