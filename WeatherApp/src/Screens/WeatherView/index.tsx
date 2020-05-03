import React, {useEffect, useState} from 'react';
import {FlatList, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {REACT_APP_WEATHER_API_KEY} from 'react-native-dotenv';

import Styled from 'styled-components/native';

const Container = Styled.SafeAreaView`flex:1; background-color:#EEE;`;
const WeatherContainer = Styled(FlatList)``;
const LoadingView = Styled.View`flex:1; justify-content:center; align-items:center;`;
const Loading = Styled.ActivityIndicator`margin-bottom:16px;`;
const LoadingLabel = Styled.Text`font-size:16px;`;
const WeatherItemContainer = Styled.View`height: 100%; justify-content:center; align-items:center;`;
const Weather = Styled.Text`margin-bottom: 16px; font-size: 24px; font-weight: bold;`;
const Temperature = Styled.Text`font-size: 16px;`;

interface Props {}

interface IWeather {
  temperature?: number;
  weather?: string;
  isLoading: boolean;
}

const WeatherView = ({}: Props) => {
  const [weatherInfo, setWeatherInfo] = useState<IWeather>({
    temperature: undefined,
    weather: undefined,
    isLoading: false,
  });

  const getCurrentWeather = () => {
    setWeatherInfo({isLoading: false});
    Geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}`,
        )
          .then((response) => response.json())
          .then((json) => {
            setWeatherInfo({
              temperature: json.main.temp,
              weather: json.weather[0].main,
              isLoading: true,
            });
          })
          .catch((error) => {
            console.log(error);
            setWeatherInfo({isLoading: true});
            showError(String(error));
          });
      },
      (error) => {
        console.log(error);
        setWeatherInfo({isLoading: true});
        showError(String(error));
      },
    );
  };

  const showError = (message: string): void => {
    setTimeout(() => {
      Alert.alert(message);
    }, 500);
  };

  useEffect(() => {
    getCurrentWeather();
  }, []);

  let data = [];
  const {isLoading, weather, temperature} = weatherInfo;
  if (weather && temperature) {
    data.push(weatherInfo);
  }

  return (
    <Container>
      <WeatherContainer
        onRefresh={() => getCurrentWeather()}
        refreshing={!isLoading}
        data={data}
        keyExtractor={(item, index) => {
          return `Weather-${index}`;
        }}
        ListEmptyComponent={
          <LoadingView>
            <Loading size="large" color="#1976D2" />
            <LoadingLabel>Loading ...</LoadingLabel>
          </LoadingView>
        }
        renderItem={({item, index}) => (
          <WeatherItemContainer>
            <Weather>{(item as IWeather).weather}</Weather>
            <Temperature>({(item as IWeather).temperature}ºC)</Temperature>
          </WeatherItemContainer>
        )}
        contentContainerStyle={{flex: 1}}
      />
    </Container>
  );
};

export default WeatherView;
