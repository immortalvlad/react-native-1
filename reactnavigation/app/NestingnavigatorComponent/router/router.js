import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button
} from 'react-native';

import {TabNavigator, StackNavigator} from "react-navigation";
import {ChatScreen} from "../../HelloMobileApp/router/router";

class RecentChatsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />
            </View>
        )
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Chat', {user: 'Lucy'})}
                    title="Chat with Lucy"
                />
            </View>
        )
    }
}

export class NavigatorWrappingScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text> asdasd sad asdasdasd</Text>
                <MainScreenNavigator />
            </View>
        );
    }
}

export const MainScreenNavigator = TabNavigator({
    Recent: {screen: RecentChatsScreen},
    All: {screen: AllContactsScreen}
});

export const SimpleApp = StackNavigator({
    Home: {
        screen: NavigatorWrappingScreen,
    },
    Chat: {screen: ChatScreen},
});

// NavigatorWrappingScreen.router = MainScreenNavigator.router;
