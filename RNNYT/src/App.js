import React from 'react';
import { Provider } from 'react-redux';
// import HomeScreen from './components/HomeScreen.android';
// import Nav from './components/Nav';
import NavContainer from './containers/NavContainer';
import createStore from './createStore';

const store = createStore();

export default () => (
    <Provider store={store}>
        <NavContainer />
    </Provider>
);