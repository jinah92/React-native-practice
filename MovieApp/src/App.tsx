/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect} from 'react';
import {StatusBar, SafeAreaView, Text} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const ScrollView = Styled.SafeAreaView`background-color: ${Colors.lighter};`;
const Body = Styled.View`background-color: ${Colors.white};`;
const SectionContainer = Styled.View`margin-top:32px;padding-horizontal:24px;`;
const SectionDescriptioin = Styled.Text`margin-top:8px; font-size: 18px; font-weight: 400; color: ${Colors.dark};`;
const HighLight = Styled.Text`font-weight: 700;`;

interface Props {}

const App = ({}: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Fragment>
      <Text>Hello</Text>
    </Fragment>
  );
};

export default App;
