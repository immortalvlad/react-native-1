import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


class Title extends Component {
	render() {
		return (
			<h1>
				{this.props.titleText}
			</h1>
		);
	}
}
Title.propTypes = {
    titleText : PropTypes.string
};
Title.defaultProps = {
    titleText : 'some text'
};

ReactDOM.render(
		<Title/>,
        document.getElementById('root')
 );
