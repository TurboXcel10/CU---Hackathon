import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, Factory, ShieldCheck, GraduationCap, Info } from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

type RoleType = 'manufacturer' | 'consumer' | 'student';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<RoleType>('manufacturer');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleSelectRole = (role: RoleType) => {
    setSelectedRole(role);
    if (role === 'manufacturer') {
      setInfoMessage(null);
    } else {
      setInfoMessage('Coming soon in the full platform');
    }
  };

  const handleContinue = () => {
    if (selectedRole === 'manufacturer') {
      router.push('/manufacturer-dashboard');
    } else {
      setInfoMessage('Coming soon in the full platform');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={handleBack}
            accessibilityLabel="Go back to welcome screen"
          >
            <ArrowLeft size={22} color={GlobalColors.dark} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>How will you use TRUSTMARK?</Text>
            <Text style={styles.subtitle}>Choose your role to get a personalised experience.</Text>
          </View>
        </View>

        {/* Roles List */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Card 1: Manufacturer / MSME */}
          <Pressable
            style={({ pressed }) => [
              styles.card,
              selectedRole === 'manufacturer' && styles.cardSelected,
              pressed && styles.cardPressed,
            ]}
            onPress={() => handleSelectRole('manufacturer')}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, selectedRole === 'manufacturer' && styles.iconContainerSelected]}>
                <Factory 
                  size={22} 
                  color={selectedRole === 'manufacturer' ? GlobalColors.primary : GlobalColors.secondary} 
                />
              </View>
              <View style={[styles.badgeMvp, selectedRole === 'manufacturer' && styles.badgeMvpSelected]}>
                <Text style={styles.badgeMvpText}>Available in MVP</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Manufacturer / MSME</Text>
            <Text style={styles.cardDescription}>
              Find applicable BIS standards, certification requirements, testing and laboratories.
            </Text>
          </Pressable>

          {/* Card 2: Consumer */}
          <Pressable
            style={({ pressed }) => [
              styles.card,
              selectedRole === 'consumer' && styles.cardSelected,
              pressed && styles.cardPressed,
            ]}
            onPress={() => handleSelectRole('consumer')}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, selectedRole === 'consumer' && styles.iconContainerSelected]}>
                <ShieldCheck 
                  size={22} 
                  color={selectedRole === 'consumer' ? GlobalColors.primary : GlobalColors.secondary} 
                />
              </View>
              <View style={styles.badgeComingSoon}>
                <Text style={styles.badgeComingSoonText}>Coming soon</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Consumer</Text>
            <Text style={styles.cardDescription}>
              Verify HUID and certification-related information and report suspicious products.
            </Text>
          </Pressable>

          {/* Card 3: Student */}
          <Pressable
            style={({ pressed }) => [
              styles.card,
              selectedRole === 'student' && styles.cardSelected,
              pressed && styles.cardPressed,
            ]}
            onPress={() => handleSelectRole('student')}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, selectedRole === 'student' && styles.iconContainerSelected]}>
                <GraduationCap 
                  size={22} 
                  color={selectedRole === 'student' ? GlobalColors.primary : GlobalColors.secondary} 
                />
              </View>
              <View style={styles.badgeComingSoon}>
                <Text style={styles.badgeComingSoonText}>Coming soon</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>Student</Text>
            <Text style={styles.cardDescription}>
              Learn Indian Standards through practical case studies and quizzes.
            </Text>
          </Pressable>

          {/* Toast / Info Message */}
          {infoMessage && (
            <View style={styles.infoBanner}>
              <Info size={16} color={GlobalColors.warning} />
              <Text style={styles.infoBannerText}>{infoMessage}</Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.knowledgeText}>
            TRUSTMARK connects users with BIS information through a single intelligent knowledge layer.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              pressed && styles.continueButtonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <ArrowRight size={20} color={GlobalColors.card} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalColors.background,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GlobalColors.card,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonPressed: {
    backgroundColor: GlobalColors.border,
  },
  headerTextContainer: {
    gap: 4,
  },
  title: {
    ...Typography.heading,
    fontSize: 24,
    color: GlobalColors.dark,
    lineHeight: 30,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 14,
    color: GlobalColors.secondary,
    lineHeight: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 4,
  },
  card: {
    backgroundColor: GlobalColors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: GlobalColors.border,
  },
  cardSelected: {
    borderColor: GlobalColors.primary,
    backgroundColor: '#F0F8F5',
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: GlobalColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSelected: {
    backgroundColor: '#DDF0E9',
  },
  badgeMvp: {
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeMvpSelected: {
    backgroundColor: '#CEEAE0',
  },
  badgeMvpText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.primary,
    fontWeight: '600',
  },
  badgeComingSoon: {
    backgroundColor: '#ECEFED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeComingSoonText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    fontWeight: '500',
  },
  cardTitle: {
    ...Typography.section,
    fontSize: 16.5,
    color: GlobalColors.dark,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    ...Typography.body,
    fontSize: 13,
    color: GlobalColors.secondary,
    lineHeight: 18,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF8EB',
    borderColor: '#F9E2AF',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 2,
  },
  infoBannerText: {
    ...Typography.caption,
    fontSize: 12,
    color: '#9C6500',
    fontWeight: '500',
  },
  footer: {
    gap: 10,
    paddingTop: 12,
  },
  knowledgeText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  continueButton: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  continueButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  continueButtonText: {
    ...Typography.section,
    fontSize: 16.5,
    color: GlobalColors.card,
    fontWeight: '600',
  },
});
