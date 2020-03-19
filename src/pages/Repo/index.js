import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

import ProgressBar from '../../components/ProgressBar';

export default class Repo extends Component {
  static propTypes = {
    route: PropTypes.shape().isRequired,
  };

  state = {
    progress: 0,
  };

  render() {
    const { progress } = this.state;
    const { route } = this.props;
    const { uri } = route.params;

    return (
      <>
        <ProgressBar progress={progress} />
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          onLoadProgress={({ nativeEvent }) => {
            this.setState({ progress: nativeEvent.progress * 100 });
          }}
        />
      </>
    );
  }
}
