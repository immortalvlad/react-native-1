import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

import Byline from './Byline';
import AppText from './AppText';
import Thumbnail from './Thumbnail';
import * as globalStyles from '../styles/global';

export default class NewsItem extends Component {

    onLongPress() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Bookmark', 'Cancel'],
            cancelButtonIndex: 1,
            title: this.props.title
        }, (buttonIndex) => {
            if (buttonIndex === 0) {
                this.props.onBookmark();
            }
        });
    }

    render() {
        const {
            style,
            imageUrl,
            title,
            author,
            date,
            location,
            description,
            onPress
        } = this.props;

        const accentColor = globalStyles.ACCENT_COLORS[
                this.props.index % globalStyles.ACCENT_COLORS.length
            ];

        return (
            <TouchableOpacity
                style={style}
                onPressIn={() => console.log('Press started')}
                onPressOut={() => console.log('Press ending')}
                onPress={onPress}
                onLongPress={this.onLongPress()}
            >
                <View>
                    <Thumbnail
                        url={imageUrl}
                        titleText={title}
                        accentColor={accentColor}
                        style={styles.thumbnail}
                    />
                    <View style={styles.content}>
                        <Byline
                            author={author}
                            date={date}
                            location={location}
                        />
                        <AppText>
                            {description}
                        </AppText>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
NewsItem.propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    location: PropTypes.string,
    index: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    onBookmark: PropTypes.func.isRequired
};

NewsItem.defaultProps = {
    onPress: ()=>{}
};

const styles = StyleSheet.create({
    thumbnail: {
        marginBottom: 5
    },
    content: {
        paddingHorizontal: 5
    }
});