import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    ActivityIndicator,
    TextInput
} from 'react-native';



import {StackNavigator} from 'react-navigation';


export class HomeScreen extends React.Component {

    constructor(prop) {
        super(prop);
        this.username = 'Vlad';
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Welcome'
        }
    };

    name() {
        return `Chat with ${this.username}`;
    }

    render() {
        const {navigate} = this.props.navigation;
        const username = 'Vlad';
        // const textn = 'Chat with `${username}';
        return (
            <View>
                <Text>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Chat', {user: this.username})}
                    title={this.name()}
                />
            </View>
        );
    }
}

export class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { state, setParams,navigate } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        console.log(navigation);
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: (
                <Button
                    title={isInfo ? 'Done' : `${user}'s info`}
                    onPress={() => {
                        // setParams({ mode: isInfo ? 'none' : 'info' });
                        navigate('EditInfoScreen');
                    }}
                />
            ),
        };
    };

    render() {
        console.log(this.props);
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

class EditInfoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <Button
                title="Save"
                onPress={params.handleSave ? params.handleSave : () => null}
            />
        );
        if (params.isSaving) {
            headerRight = <ActivityIndicator />;
        }
        return { headerRight };
    };

    state = {
        nickname: 'Lucy jacuzzi'
    };

    _handleSave = () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isSaving: true });

        // Fictional function to save information in a store somewhere
        // saveInfo().then(() => {
            setTimeout(()=>(
                this.props.navigation.setParams({ isSaving: false})
            ),2000);
        // })
    }

    componentDidMount() {
        // We can only set the function after the component has been initialized
        this.props.navigation.setParams({ handleSave: this._handleSave });
    }

    render() {
        return (
            <TextInput
                onChangeText={(nickname) => this.setState({ nickname })}
                placeholder={'Nickname'}
                value={this.state.nickname}
            />
        );
    }
}

export const SimpleApp = StackNavigator({
    Home: {screen: HomeScreen},
    Chat: {screen: ChatScreen},
    EditInfoScreen: {screen:EditInfoScreen}
});
