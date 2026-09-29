import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider, useCart } from './src/context/CartContext';
import { COLORS } from './src/data/data';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Emoji icons for the tab bar (no icon library needed)
const tabIcon = (emoji) => () => <Text style={{ fontSize: 22 }}>{emoji}</Text>;

// Bottom tabs: Home, Cart, Profile
function Tabs() {
  const { count } = useCart(); // show number of items on the Cart tab
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tabIcon('🏠') }} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarIcon: tabIcon('🛒'), tabBarBadge: count > 0 ? count : undefined }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: tabIcon('👤') }} />
    </Tab.Navigator>
  );
}

// Stack: the tabs + the Menu screen that opens on top of them
export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator>
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={({ route }) => ({
                title: route.params?.category ? route.params.category.name : 'Full Menu',
                headerTintColor: COLORS.primary,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
