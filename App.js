import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import BudgetScreen from './screens/BudgetScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import EditBugetScreen from './screens/EditBugetScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Budget" component={BudgetScreen} options={{title: 'Orçamentos'}} />
        <Stack.Screen name="Account" component={CreateProfileScreen} options={{tile: 'Criar conta'}} />
        <Stack.Screen name='History' component={HistoryScreen} options={{title:'Orçamentos'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
