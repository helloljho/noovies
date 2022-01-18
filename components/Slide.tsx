import React from 'react';
import styled from 'styled-components/native';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';
import Poster from './Poster';
import { useNavigation } from '@react-navigation/native';

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.6);
`;

const Votes = styled(OverView)`
  margin-top: 5px;
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string | null;
  posterPath: string | null;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}
const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  const goToDetail = () => {
    navigation.navigate('Stack', { screen: 'Detail' });
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          tint={isDark ? 'dark' : 'light'}
          intensity={80}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title>{originalTitle}</Title>
              <Votes>
                {voteAverage > 0 ? `⭐ ${voteAverage}/10` : `Comming soon`}
              </Votes>
              <OverView>{overview.slice(0, 90)}...</OverView>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
