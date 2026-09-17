import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function ManufacturerDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manufacturer Dashboard</Text>
      <Link href="/product-assessment" style={styles.link}>Go to Product Assessment</Link>
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
