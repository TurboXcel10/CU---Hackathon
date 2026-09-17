import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Bell, 
  User, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  Route, 
  Building2, 
  Home, 
  Package, 
  FileText 
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

type TabType = 'home' | 'products' | 'journey' | 'profile';

export default function ManufacturerDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Fixed Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Good morning 👋</Text>
            <Text style={styles.headerTitle}>Manufacturer Dashboard</Text>
          </View>
          <View style={styles.headerRightActions}>
            <Pressable 
              style={({ pressed }) => [styles.iconButton, pressed && styles.iconButtonPressed]}
              accessibilityLabel="Notifications"
            >
              <Bell size={20} color={GlobalColors.dark} />
              <View style={styles.notificationDot} />
            </Pressable>
            <Pressable 
              style={({ pressed }) => [styles.avatarButton, pressed && styles.iconButtonPressed]}
              accessibilityLabel="Profile"
            >
              <User size={18} color={GlobalColors.primary} />
            </Pressable>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Card */}
          <View style={styles.heroCard}>
            <View style={styles.heroBadge}>
              <Search size={18} color={GlobalColors.card} />
              <Text style={styles.heroBadgeText}>BIS Assessment</Text>
            </View>
            <Text style={styles.heroTitle}>Check your product</Text>
            <Text style={styles.heroDescription}>
              Find potentially applicable BIS standards, requirements and next steps.
            </Text>
            <Pressable 
              style={({ pressed }) => [
                styles.heroButton,
                pressed && styles.heroButtonPressed,
              ]}
              onPress={() => router.push('/product-assessment')}
            >
              <Text style={styles.heroButtonText}>Start Assessment</Text>
              <ArrowRight size={18} color={GlobalColors.primary} />
            </Pressable>
          </View>

          {/* Section: Your Current Assessment */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Current Assessment</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>1 In Progress</Text>
              </View>
            </View>

            {/* Product Card */}
            <View style={styles.productCard}>
              <View style={styles.productTopRow}>
                <View style={styles.productIconContainer}>
                  <Layers size={22} color={GlobalColors.primary} />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>Stainless Steel Drinking Water Bottle</Text>
                  <Text style={styles.productDetails}>1 Litre • Reusable • Hotels & Restaurants</Text>
                </View>
              </View>

              {/* Progress */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>Compliance readiness</Text>
                  <Text style={styles.progressValue}>68%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '68%' }]} />
                </View>
              </View>

              {/* Status & Action */}
              <View style={styles.productFooter}>
                <View style={styles.statusPill}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Testing pending</Text>
                </View>

                <Pressable 
                  style={({ pressed }) => [
                    styles.continueLinkButton,
                    pressed && styles.continueLinkButtonPressed,
                  ]}
                  onPress={() => router.push('/compliance-report')}
                >
                  <Text style={styles.continueLinkText}>Continue</Text>
                  <ArrowRight size={16} color={GlobalColors.primary} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Section: Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {/* Action 1 */}
              <Pressable 
                style={({ pressed }) => [
                  styles.quickActionCard,
                  pressed && styles.quickActionCardPressed,
                ]}
                onPress={() => router.push('/product-assessment')}
              >
                <View style={styles.quickActionIconContainer}>
                  <FileText size={20} color={GlobalColors.primary} />
                </View>
                <Text style={styles.quickActionTitle}>Find Standard</Text>
              </Pressable>

              {/* Action 2 */}
              <Pressable 
                style={({ pressed }) => [
                  styles.quickActionCard,
                  pressed && styles.quickActionCardPressed,
                ]}
                onPress={() => router.push('/certification-journey')}
              >
                <View style={styles.quickActionIconContainer}>
                  <Route size={20} color={GlobalColors.primary} />
                </View>
                <Text style={styles.quickActionTitle}>Certification Journey</Text>
              </Pressable>

              {/* Action 3 */}
              <Pressable 
                style={({ pressed }) => [
                  styles.quickActionCard,
                  pressed && styles.quickActionCardPressed,
                ]}
                onPress={() => router.push('/laboratory-finder')}
              >
                <View style={styles.quickActionIconContainer}>
                  <Building2 size={20} color={GlobalColors.primary} />
                </View>
                <Text style={styles.quickActionTitle}>Find Laboratory</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* Floating AI Assistant Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.floatingAiButton,
            pressed && styles.floatingAiButtonPressed,
          ]}
          onPress={() => router.push('/ai-assistant')}
          accessibilityLabel="TRUSTMARK AI Assistant"
        >
          <Sparkles size={18} color={GlobalColors.card} />
          <Text style={styles.floatingAiText}>TRUSTMARK AI</Text>
        </Pressable>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <Pressable 
            style={styles.navItem} 
            onPress={() => setActiveTab('home')}
          >
            <Home size={22} color={activeTab === 'home' ? GlobalColors.primary : GlobalColors.secondary} />
            <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
          </Pressable>

          <Pressable 
            style={styles.navItem} 
            onPress={() => {
              setActiveTab('products');
              router.push('/product-assessment');
            }}
          >
            <Package size={22} color={activeTab === 'products' ? GlobalColors.primary : GlobalColors.secondary} />
            <Text style={[styles.navLabel, activeTab === 'products' && styles.navLabelActive]}>Products</Text>
          </Pressable>

          <Pressable 
            style={styles.navItem} 
            onPress={() => {
              setActiveTab('journey');
              router.push('/certification-journey');
            }}
          >
            <Route size={22} color={activeTab === 'journey' ? GlobalColors.primary : GlobalColors.secondary} />
            <Text style={[styles.navLabel, activeTab === 'journey' && styles.navLabelActive]}>Journey</Text>
          </Pressable>

          <Pressable 
            style={styles.navItem} 
            onPress={() => setActiveTab('profile')}
          >
            <User size={22} color={activeTab === 'profile' ? GlobalColors.primary : GlobalColors.secondary} />
            <Text style={[styles.navLabel, activeTab === 'profile' && styles.navLabelActive]}>Profile</Text>
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
    backgroundColor: GlobalColors.background,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: GlobalColors.background,
  },
  greetingText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.secondary,
    fontWeight: '500',
  },
  headerTitle: {
    ...Typography.section,
    fontSize: 20,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: GlobalColors.card,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconButtonPressed: {
    opacity: 0.8,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E04F44',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E6F4EE',
    borderWidth: 1.5,
    borderColor: '#CEEAE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 18,
  },
  heroCard: {
    backgroundColor: GlobalColors.primary,
    borderRadius: 18,
    padding: 20,
    gap: 10,
    shadowColor: GlobalColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroBadgeText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.card,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  heroTitle: {
    ...Typography.heading,
    fontSize: 22,
    color: GlobalColors.card,
    fontWeight: '700',
  },
  heroDescription: {
    ...Typography.body,
    fontSize: 13.5,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 19,
  },
  heroButton: {
    backgroundColor: GlobalColors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    gap: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  heroButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  heroButtonText: {
    ...Typography.section,
    fontSize: 14.5,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  sectionContainer: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Typography.section,
    fontSize: 16.5,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  activeBadge: {
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  activeBadgeText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.primary,
    fontWeight: '600',
  },
  productCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  productTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  productIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    gap: 3,
  },
  productName: {
    ...Typography.section,
    fontSize: 15,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  productDetails: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  progressSection: {
    gap: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  progressValue: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  progressBarBackground: {
    height: 7,
    backgroundColor: '#EAEFED',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: GlobalColors.primary,
    borderRadius: 4,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF8EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F9E2AF',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalColors.warning,
  },
  statusText: {
    ...Typography.caption,
    fontSize: 11,
    color: '#9C6500',
    fontWeight: '600',
  },
  continueLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  continueLinkButtonPressed: {
    opacity: 0.7,
  },
  continueLinkText: {
    ...Typography.section,
    fontSize: 13.5,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    minHeight: 90,
  },
  quickActionCardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F0F8F5',
  },
  quickActionIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionTitle: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.dark,
    fontWeight: '600',
    textAlign: 'center',
  },
  floatingAiButton: {
    position: 'absolute',
    bottom: 74,
    right: 20,
    backgroundColor: GlobalColors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  floatingAiButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  floatingAiText: {
    ...Typography.caption,
    fontSize: 12.5,
    color: GlobalColors.card,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: GlobalColors.card,
    borderTopWidth: 1,
    borderTopColor: GlobalColors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  navLabel: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    fontWeight: '500',
  },
  navLabelActive: {
    color: GlobalColors.primary,
    fontWeight: '700',
  },
});
