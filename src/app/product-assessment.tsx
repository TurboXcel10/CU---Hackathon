import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function ProductAssessmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Assessment</Text>
      <Link href="/compliance-report" style={styles.link}>Go to Compliance Report</Link>
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
