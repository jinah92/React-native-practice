/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Styled from 'styled-components/native';

import WeatherView from '~/Screens/WeatherView';

const Container = Styled.View`flex:1; background-color:#EEE`;

interface Props {}

const App = ({}: Props) => {
  return (
    <Container>
      <WeatherView />
    </Container>
  );
};

export default App;
