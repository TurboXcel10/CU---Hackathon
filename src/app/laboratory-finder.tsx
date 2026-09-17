import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function LaboratoryFinderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratory Finder</Text>
      <Link href="/ai-assistant" style={styles.link}>Go to AI Assistant</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  }
});
