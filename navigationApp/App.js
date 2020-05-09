/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {Image, Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = ({navigation, route}) => {
  // const navigation = useNavigation();
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() =>
          navigation.navigate('Detail', {itemId: 86, otherParams: 'anything'})
        }
      />
      <Button
        title="Create Post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Button
        title="update the title"
        onPress={() => {
          navigation.setOptions({title: 'updated!'});
        }}
      />
      <Text style={{margin: 10}}>Post: {route.params?.post}</Text>
    </View>
  );
};

const CreatePostScreen = ({navigation, route}) => {
  const [postText, setPostText] = React.useState('');
  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate('Home', {post: postText});
        }}
      />
    </>
  );
};
const DetailScreen = ({route, navigation}) => {
  const {itemId, otherParams} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>id: {itemId}</Text>
      {/* <Text>other: {otherParams}</Text> */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Stack = createStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{width: 50, height: 50}}
      source={require('./images/react-logo.png')}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        /* screenOptions={{
          headerStyle: {backgroundColor: '#f4411e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} */
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => {
              <Button
                onPress={() => {
                  alert('this is a button!');
                }}
                title="Info"
                color="#fff"
              />;
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          initialParams={{itemId: 42}}
          options={({route}) => ({title: route.params.itemId})}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{title: 'Post'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
