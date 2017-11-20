import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import AppText from './AppText';

const SmallText = ({ children, style, ...rest }) => (
    <AppText style={[styles.small, style]} {...rest}>
        {children}
    </AppText>
);
SmallText.propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style
};
const styles = StyleSheet.create({
    small: {
        fontSize: 11
    }
});
export default SmallText;