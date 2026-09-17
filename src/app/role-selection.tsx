import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function RoleSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Role Selection</Text>
      <Link href="/manufacturer-dashboard" style={styles.link}>Go to Manufacturer Dashboard</Link>
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
