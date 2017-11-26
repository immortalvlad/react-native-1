import React, {Component} from 'react';
import {
    View,
    Text,
    Alert,
    Vibration,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import ScrollableTabView, {DefaultTabBar } from 'react-native-scrollable-tab-view';
// import Search from "./Search";
import SearchContainer from '../containers/SearchContainer';
// import NewsFeed from "./NewsFeed";
import NewsFeedContainer from '../containers/NewsFeedContainer';

export default class  HomeScreen extends Component{
    showBookmarkAlert(ev) {
        if(ev.i ===1){
            Vibration.vibrate();
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            )
        }
        console.log(ev);
    }

    render(){
        const { selectedTab, tab } = this.props;
        return (
            <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={1}
                renderTabBar={() => <DefaultTabBar />}
                onChangeTab={this.showBookmarkAlert}
                >
                <TouchableOpacity tabLabel='Tab #1'
                >
                    <SearchContainer></SearchContainer>
                </TouchableOpacity>
                <Text tabLabel='Tab #2'>favorite</Text>
                <NewsFeedContainer tabLabel='Tab #3'>project</NewsFeedContainer>
            </ScrollableTabView>

        );
    }

}