import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { MovieResponse, moviesApi } from '../api';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import { useQuery, useQueryClient } from 'react-query';
import Loader from '../components/Loader';
import HList from '../components/HList';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshin] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = item => item.id + '';
  const onRefresh = async () => {
    setRefreshin(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshin(false);
  };

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData
              ? nowPlayingData.results.map(movie => (
                  <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path || null}
                    posterPath={movie.poster_path || null}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                  />
                ))
              : null}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  ) : null;
};

export default Movies;
