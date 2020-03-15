import React, { Component } from 'react';
import { Animated } from 'react-native';
import { WebView } from 'react-native-webview';

import ProgressBar from './styles';

const AnimatedProgressBar = Animated.createAnimatedComponent(ProgressBar);

export default class Repo extends Component {
  state = {
    width: 0,
  };

  render() {
    const { width } = this.state;
    const { route } = this.props;
    const { uri } = route.params;

    return (
      <>
        <AnimatedProgressBar width={width} />
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          onLoadProgress={({ nativeEvent }) => {
            this.setState({ width: nativeEvent.progress * 100 });
          }}
        />
      </>
    );
  }
}
