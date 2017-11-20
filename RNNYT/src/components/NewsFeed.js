import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    WebView
} from 'react-native';

import PropTypes from 'prop-types';

import * as globalStyles from '../styles/global';
import NewsItem from "./NewsItem";
import  SmallText from  "./SmallText";

export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        // console.log(this.ds.cloneWithRows(props.news));
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            modalVisible: false
        };

        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(rowData, ...rest) {
        // console.log(rowData);
        // console.log(rest);
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem
                onPress={() => this.onModalOpen(rowData.url)}
                style={styles.newsItem}
                index={index}
                {...rowData}
            />
        );
    }
    onModalOpen(url) {
        this.setState({
            modalVisible: true,
            modalUrl: url
        });
    }
    onModalClose() {
        this.setState({
            modalVisible: false
        });
    }
    renderModal() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={this.onModalClose}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={this.onModalClose}
                        style={styles.closeButton}
                    >
                        <SmallText>Close</SmallText>
                    </TouchableOpacity>
                    <WebView
                        scalesPageToFit
                        source={{ uri: this.state.modalUrl }}
                    />
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={globalStyles.COMMON_STYLES.pageContainer}>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    style={this.props.listStyles}
                />
                {this.renderModal()}
            </View>
        );
    }
}

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    listStyles: View.propTypes.style
};

NewsFeed.defaultProps = {
    news: [
        {
            title: 'React Native',
            imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            description: 'Build Native Mobile Apps using JavaScript and React',
            date: new Date(),
            author: 'Facebook',
            location: 'Menlo Park, California',
            url: 'https://facebook.github.io/react-native'
        },
        {
            title: 'Packt Publishing',
            imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
            description: 'Stay Relevant',
            date: new Date(),
            author: 'Packt Publishing',
            location: 'Birmingham, UK',
            url: 'https://www.packtpub.com/'
        }

    ]
};
const styles = StyleSheet.create({
    newsItem: {
        marginBottom: 20
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: globalStyles.BG_COLOR
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row'
    }
});