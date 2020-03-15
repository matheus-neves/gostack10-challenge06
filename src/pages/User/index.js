import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape().isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: false,
    loadingMore: false,
    refreshing: false,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: response.data, loading: false });
  }

  loadMore = async () => {
    const { page, stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ loadingMore: true });
    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: page + 1,
      },
    });

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loadingMore: false,
    });
  };

  refreshList = async () => {
    const { route } = this.props;
    const { user } = route.params;

    this.setState({ loading: true });

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page: 1,
      },
    });

    this.setState({ stars: response.data, page: 1, loading: false });
  };

  handleNavigate = repo => {
    const { navigation } = this.props;

    navigation.navigate('Repo', {
      uri: repo.html_url,
      name: repo.name,
    });
  };

  render() {
    const { stars, loading, loadingMore, refreshing } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading>
            <ActivityIndicator size={60} color="#7159c1" />
          </Loading>
        ) : (
          <>
            <Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              onEndReachedThreshold={0.4}
              onEndReached={this.loadMore}
              onRefresh={this.refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
              refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
              // Restante das props
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.handleNavigate(item)}>
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                </TouchableOpacity>
              )}
            />
            {loadingMore && (
              <Loading loadingMore>
                <ActivityIndicator size={30} color="#7159c1" />
              </Loading>
            )}
          </>
        )}
      </Container>
    );
  }
}
