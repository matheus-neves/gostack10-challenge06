import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import api from '../../services/api';

// import { Container } from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape().isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { route } = this.props;

    const { user } = route.params;

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;
    return (
      <View>
        <Text>User</Text>
      </View>
    );
  }
}
