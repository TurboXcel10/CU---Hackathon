import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { ShieldCheck, Package, FileText, CheckCircle, ArrowRight } from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  
  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(100, withTiming(1, { duration: 800 }));
    translateY.value = withDelay(100, withTiming(0, { duration: 800 }));
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <ShieldCheck size={28} color={GlobalColors.primary} strokeWidth={2.5} />
            <Text style={styles.logoText}>TRUSTMARK</Text>
          </View>
        </View>

        {/* Center Section - Animated */}
        <Animated.View style={[styles.centerSection, animatedStyle]}>
          <Text style={styles.headline}>
            BIS Compliance,{'\n'}made simpler.
          </Text>
          
          <Text style={styles.supportingText}>
            Discover applicable standards, understand requirements, and follow your compliance journey with evidence-backed guidance.
          </Text>

          {/* Visual Flow */}
          <View style={styles.flowCard}>
            <View style={styles.flowItem}>
              <View style={styles.iconCircle}>
                <Package size={20} color={GlobalColors.primary} />
              </View>
              <Text style={styles.flowText}>PRODUCT</Text>
            </View>

            <ArrowRight size={16} color={GlobalColors.border} />

            <View style={styles.flowItem}>
              <View style={styles.iconCircle}>
                <FileText size={20} color={GlobalColors.primary} />
              </View>
              <Text style={styles.flowText}>STANDARD</Text>
            </View>

            <ArrowRight size={16} color={GlobalColors.border} />

            <View style={styles.flowItem}>
              <View style={styles.iconCircle}>
                <CheckCircle size={20} color={GlobalColors.primary} />
              </View>
              <Text style={styles.flowText}>EVIDENCE</Text>
            </View>
            
            <ArrowRight size={16} color={GlobalColors.border} />

            <View style={styles.flowItem}>
              <View style={[styles.iconCircle, { backgroundColor: GlobalColors.primary }]}>
                <ArrowRight size={20} color={GlobalColors.card} />
              </View>
              <Text style={styles.flowText}>ACTION</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Section */}
        <Animated.View style={[styles.bottomSection, animatedStyle]}>
          <Pressable 
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed
            ]}
            onPress={() => router.push('/role-selection')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <ArrowRight size={20} color={GlobalColors.card} />
          </Pressable>
          <Text style={styles.secondaryText}>
            Evidence-backed guidance for Indian Standards
          </Text>
        </Animated.View>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoText: {
    ...Typography.section,
    color: GlobalColors.dark,
    letterSpacing: 1,
    fontWeight: '700',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  headline: {
    ...Typography.heading,
    color: GlobalColors.dark,
    marginBottom: 16,
    lineHeight: 38,
  },
  supportingText: {
    ...Typography.body,
    color: GlobalColors.secondary,
    lineHeight: 24,
    marginBottom: 48,
  },
  flowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalColors.card,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  flowItem: {
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GlobalColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowText: {
    ...Typography.caption,
    color: GlobalColors.dark,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bottomSection: {
    gap: 16,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    ...Typography.section,
    fontSize: 18,
    color: GlobalColors.card,
  },
  secondaryText: {
    ...Typography.caption,
    color: GlobalColors.secondary,
    textAlign: 'center',
  },
});
