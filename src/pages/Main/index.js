import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  ErrorText,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  RemoveButton,
} from './styles';

export default class Main extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    error: {
      message: '',
      show: false,
    },
    loading: false,
  };

  async componentDidMount() {
    // await AsyncStorage.removeItem('users');

    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  removeItem = item => {
    const { users } = this.state;

    const filteredUsers = users.filter(user => user !== item);

    this.setState({ users: filteredUsers });
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    if (!newUser) {
      this.setState({
        error: {
          message: 'Campo inválido',
          show: true,
        },
      });
      return;
    }

    this.setState({ loading: true });

    const userExists = await users.find(user => user.login === newUser);

    if (userExists) {
      this.setState({
        error: {
          message: 'Usúario já existe.',
          show: true,
        },
      });
      return;
    }

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [data, ...users],
      newUser: '',
      loading: false,
      error: {
        message: '',
        show: false,
      },
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, error, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        {error.show && <ErrorText>{error.message}</ErrorText>}

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <RemoveButton onPress={() => this.removeItem(item)}>
                <Icon name="remove-circle" color="#fda50f" size={30} />
              </RemoveButton>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Detalhes</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
