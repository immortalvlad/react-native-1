import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    WebView,
    RefreshControl,
    ActivityIndicator,
    NetInfo,
    Linking
} from 'react-native';

import PropTypes from 'prop-types';

import * as globalStyles from '../styles/global';
import NewsItem from "./NewsItem";
import  SmallText from  "./SmallText";
import AppText from './AppText';

export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.title !== row2.title
        });
        // console.log(this.ds.cloneWithRows(props.news));
        this.state = {
            dataSource: this.ds.cloneWithRows(props.news),
            initialLoading: true,
            modalVisible: false,
            refreshing: false,
            connected: true
        };

        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    componentWillMount() {
        NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
        this.refresh();
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.news),
            initialLoading: false
        });
    }

    refresh() {
        if (this.props.load) {
            this.props.load();
        }
    }

    handleConnectivityChange(isConnected) {
        this.setState({
            connected: isConnected
        });
        if (isConnected) {
            this.refresh();
        }
    }

    renderRow(rowData, ...rest) {
        // console.log(rowData);
        // console.log(rest);
        const index = parseInt(rest[1], 10);
        return (
            <NewsItem
                onPress={() => this.props.onModalOpen(rowData.url)}
                onBookmark={() => this.props.addBookmark(rowData.url)}
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
                visible={this.props.modal !== undefined}
                onRequestClose={this.props.onModalClose}
            >
                <View style={styles.modalContent}>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            onPress={this.props.onModalClose}
                            style={styles.closeButton}
                        >
                            <SmallText>Close</SmallText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(this.props.modal)}
                        >
                            <SmallText>Open in Browser</SmallText>
                        </TouchableOpacity>
                        <WebView
                            scalesPageToFit
                            source={{uri: this.props.modal}}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        const {
            listStyles = globalStyles.COMMON_STYLES.pageContainer,
            showLoadingSpinner
        } = this.props;
        const {initialLoading, refreshing, dataSource} = this.state;

        if (!this.state.connected) {
            return (
                <View style={[globalStyles.COMMON_STYLES.pageContainer, styles.loadingContainer]}>
                    <AppText>
                        No Connection
                    </AppText>
                </View>
            );
        }

        return (
            (initialLoading && showLoadingSpinner
                    ? (
                        <View style={[listStyles, styles.loadingContainer]}>
                            <ActivityIndicator
                                animating
                                size="small"
                            />
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <ListView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={this.refresh}
                                    />
                                }
                                enableEmptySections
                                dataSource={dataSource}
                                renderRow={this.renderRow}
                                style={listStyles}
                            />
                            {this.renderModal()}
                        </View>
                    )
            )
        );
    }
}

NewsFeed.defaultProps = {
    showLoadingSpinner: true
};

NewsFeed.propTypes = {
    news: PropTypes.arrayOf(PropTypes.object),
    listStyles: View.propTypes.style,
    load: PropTypes.func,
    showLoadingSpinner: PropTypes.bool,

    modal: PropTypes.string,
    onModalOpen: PropTypes.func.isRequired,
    onModalClose: PropTypes.func.isRequired,

    addBookmark: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
    newsItem: {
        marginBottom: 20
    },
    container: {
        flex: 1
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    modalButtons: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

// NewsFeed.defaultProps = {
//     news: [
//         {
//             title: 'React Native',
//             imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
//             description: 'Build Native Mobile Apps using JavaScript and React',
//             date: new Date(),
//             author: 'Facebook',
//             location: 'Menlo Park, California',
//             url: 'https://facebook.github.io/react-native'
//         },
//         {
//             title: 'Packt Publishing',
//             imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
//             description: 'Stay Relevant',
//             date: new Date(),
//             author: 'Packt Publishing',
//             location: 'Birmingham, UK',
//             url: 'https://www.packtpub.com/'
//         }
//
//     ]
// };