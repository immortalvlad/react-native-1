/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

// import Byline  from './src/components/Byline';
// import Thumbnail  from './src/components/Thumbnail';
 import NewsFeed  from './src/components/NewsFeed';



export default class App extends Component<{}> {
  render() {
    let date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
    return (
    <View>
      <NewsFeed></NewsFeed>
      {/*<Thumbnail*/}
          {/*url='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='*/}
          {/*accentColor="#323232"*/}
          {/*titleText='some text'*/}
      {/*>*/}
      {/*</Thumbnail>*/}
      {/*<Byline*/}
          {/*date={date}*/}
          {/*author='Vlad'*/}
          {/*location="Ukraine"*/}
      {/*>some111</Byline>*/}
    </View>

  );
  }
}

