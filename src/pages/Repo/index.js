import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default class Repo extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const { route } = this.props;
    const { uri } = route.params;

    return (
      <>
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          onLoadProgress={({ nativeEvent }) => {
            console.log(nativeEvent.progress * 100);
          }}
        />
      </>
    );
  }
}
