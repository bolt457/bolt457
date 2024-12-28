import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// Composant d'Animation
const AnimatedComponent = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

// Écrans Individuels
const HomeScreen = ({ navigation }) => (
  <AnimatedComponent>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenue sur AfricoinMarket</Text>
      <Button
        title="En savoir plus sur les Africoins"
        onPress={() => navigation.navigate('Africoin')}
      />
    </View>
  </AnimatedComponent>
);

const AfricoinScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Page des Africoins</Text>
  </View>
);

const ShopScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Page de la Boutique</Text>
  </View>
);

// Navigateur Principal
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Africoin" component={AfricoinScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
