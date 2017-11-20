/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableHighlight
} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

/*******
 * /////////////////////////////////////////////
 */
const Button = ({style, children, ...otherProps}) => (
<TouchableHighlight
        style={[buttonStyles.core, buttonStyles.hairlineBorder, style]}
        {...otherProps}
        underlayColor="#efefef"
        activeOpacity={0.8}
    >
        {children}

    </TouchableHighlight>
);
Button.propTypes = {
    style: TouchableHighlight.propTypes.style,
    children: PropTypes.node
};

/*******
 * /////////////////////////////////////////////
 */
// export default class App2 extends Component<{}> {
//     render() {
//         return (
//             <BoxModelDemo></BoxModelDemo>
//         )
//     }
// }
export  default class App extends Component<{}> {
  render() {
    return (
        <View style={viewStyles}>
            <DemoOnLayout></DemoOnLayout>
          <TouchableHighlight
              style={[buttonStyles.core, buttonStyles.spacer]}
          >
            <Text>Default Normal</Text>
          </TouchableHighlight>
          <TouchableHighlight
              style={[buttonStyles.core, buttonStyles.hairlineBorder,
                  buttonStyles.spacer]}

          >
            <Text>Default Hairline</Text>
          </TouchableHighlight>
          <TouchableHighlight
              style={[buttonStyles.core, buttonStyles.primary, buttonStyles.spacer]}
              underlayColor="#efefef"
              activeOpacity={0.8}
              onPress={() => {}}
          >
            <Text>Primary Normal</Text>
          </TouchableHighlight>
          <TouchableHighlight
              style={[buttonStyles.core, buttonStyles.primary,
                  buttonStyles.hairlineBorder]}
          >
            <Text>Primary Hairline</Text>
          </TouchableHighlight>
            <Button >
                <Text>Custom styled button</Text>
            </Button>
            <Button onPress={() => { }} style={buttonStyles.spacer}>
                <Text>Custom button with props</Text>
            </Button>
        </View>
    );
  }
}

const buttonStyles = StyleSheet.create({
    core: {
        borderStyle: 'solid',
        borderColor: '#d5d5d5',
        borderWidth: 1,
        backgroundColor: '#eee',
        borderRadius: 3,
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5
    },
    primary: {
        backgroundColor: '#60b044',
        borderColor: '#355f27'
    },
    hairlineBorder: {
        borderWidth: StyleSheet.hairlineWidth
    },
    spacer: {
        marginBottom: 10
    }
});
const viewStyles = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
};

const btn = {
    borderStyle: 'solid',
    borderColor: '#d5d5d5',
    borderWidth: 1,
    backgroundColor: '#eee',
    borderRadius: 3,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5
};
const btnPrimary = {
    backgroundColor: '#60b044',
    borderColor: '#5ca941'
};



class DemoOnLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }
    onLayoutChange(event) {
        const { width, height } = event.nativeEvent.layout;
        this.setState({ width, height });
    }
    render() {
        return (
            <View onLayout={this.onLayoutChange} style={styles.container}>
                <Text style={styles.text}>Width: {this.state.width}, Height:
                    {this.state.height}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18
    }
});