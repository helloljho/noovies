import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
//
// const Container = styled.ScrollView`
//   background-color: ${props => props.theme.mainBgColor};
// `;

const Container = styled.ScrollView`
  text-align: center;
  background-color: ${props => (props.theme ? props.theme.mainBgColor : 'red')};
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  return (
    <Container>
      <Text>aa</Text>
    </Container>
  );
};

export default Movies;
