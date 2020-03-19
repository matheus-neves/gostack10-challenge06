import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

export default class ProgressBar extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  };

  state = {
    animation: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    const { animation } = this.state;
    const { progress } = this.props;

    if (prevProps.progress !== progress) {
      Animated.timing(animation, {
        toValue: progress,
        // duration: 3000,
      }).start();
    }
  }

  render() {
    const { animation } = this.state;

    const widthInterpolated = animation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          height: 4,
          border: 0,
          width: widthInterpolated,
          backgroundColor: '#7159c1',
        }}></Animated.View>
    );
  }
}
