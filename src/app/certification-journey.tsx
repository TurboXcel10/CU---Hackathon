import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function CertificationJourneyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Certification Journey</Text>
      <Link href="/laboratory-finder" style={styles.link}>Go to Laboratory Finder</Link>
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
