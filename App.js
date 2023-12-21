import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import CardForm from './components/CardForm';

export default function App() {
  return (
    <View style={styles.container}>
      <CardForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9c4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
