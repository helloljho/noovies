import React from 'react';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface PosterProps {
  path: string | null;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path || null) }} />
);
export default Poster;
