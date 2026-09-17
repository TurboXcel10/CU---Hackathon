import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  Circle, 
  Building2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  FlaskConical,
  FileText,
  Info
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

type StepStatus = 'completed' | 'in_progress' | 'pending';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  details?: string[];
  actionLabel?: string;
  actionRoute?: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: 'Identify applicable standard',
    description: 'Review the standard identified from your product information.',
    status: 'completed',
    details: [
      'Identified standard: IS [VERIFIED_IS_STANDARD]',
      'Material & capacity parameters matched',
      '92% evidence match confirmed'
    ],
  },
  {
    id: 2,
    title: 'Check regulatory applicability',
    description: 'Review current BIS/QCO information relevant to the product.',
    status: 'completed',
    details: [
      'Retrieved QCO notification records',
      'Determined applicable conformity assessment scheme'
    ],
  },
  {
    id: 3,
    title: 'Review product requirements',
    description: 'Understand product, marking and testing requirements.',
    status: 'completed',
    details: [
      'Grade & chemical purity requirements reviewed',
      'Mandatory product marking parameters checked'
    ],
  },
  {
    id: 4,
    title: 'Product Testing',
    description: 'Complete the tests required by the applicable standard/product requirements.',
    status: 'in_progress',
    details: [
      'Test 01: Material Grade & Chemical Composition',
      'Test 02: Corrosion & Acid Leaching Resistance',
      'Test 03: Impact, Drop & Leakage Integrity'
    ],
    actionLabel: 'View Testing Requirements',
    actionRoute: '/laboratory-finder',
  },
  {
    id: 5,
    title: 'Assessment',
    description: 'Complete the applicable conformity assessment process.',
    status: 'pending',
    details: [
      'Factory audit and quality control system verification',
      'Competent authority assessment under BIS guidelines'
    ],
  },
  {
    id: 6,
    title: 'Application',
    description: 'Prepare and submit the required application/documentation through the official process.',
    status: 'pending',
    details: [
      'Test reports & manufacturing documentation preparation',
      'Submission via official Manakonline BIS portal'
    ],
  },
  {
    id: 7,
    title: 'Certification / Licence',
    description: 'Final outcome is determined through the applicable official BIS process.',
    status: 'pending',
    details: [
      'Official BIS verification & licence grant outcome',
      'Ongoing standard mark usage surveillance'
    ],
  },
];

export default function CertificationJourneyScreen() {
  const router = useRouter();
  const [expandedStep, setExpandedStep] = useState<number | null>(4); // Default expand current in-progress step

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/manufacturer-dashboard');
    }
  };

  const toggleExpand = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            onPress={handleBack}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color={GlobalColors.dark} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Certification Journey</Text>
            <Text style={styles.subtitle}>Your compliance roadmap</Text>
          </View>
        </View>

        {/* Scroll Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Product Card */}
          <View style={styles.productCard}>
            <View style={styles.productCardTop}>
              <View style={styles.productIconCircle}>
                <ShieldCheck size={22} color={GlobalColors.primary} />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Stainless Steel Drinking Water Bottle</Text>
                <Text style={styles.productDetails}>1 Litre • Reusable • Hotels & Restaurants</Text>
              </View>
            </View>

            <View style={styles.readinessSection}>
              <View style={styles.readinessHeader}>
                <Text style={styles.readinessLabel}>Readiness</Text>
                <Text style={styles.readinessScore}>68%</Text>
              </View>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '68%' }]} />
              </View>
            </View>
          </View>

          {/* Timeline Section */}
          <View style={styles.timelineContainer}>
            {JOURNEY_STEPS.map((step, index) => {
              const isCompleted = step.status === 'completed';
              const isInProgress = step.status === 'in_progress';
              const isLast = index === JOURNEY_STEPS.length - 1;
              const isExpanded = expandedStep === step.id;

              return (
                <View key={step.id} style={styles.timelineRow}>
                  {/* Left Column: Icon node & connecting line */}
                  <View style={styles.timelineIndicatorColumn}>
                    {/* Node Circle */}
                    <View 
                      style={[
                        styles.timelineNode,
                        isCompleted && styles.timelineNodeCompleted,
                        isInProgress && styles.timelineNodeInProgress,
                      ]}
                    >
                      {isCompleted ? (
                        <Check size={14} color={GlobalColors.card} strokeWidth={3} />
                      ) : isInProgress ? (
                        <View style={styles.pulsingDot} />
                      ) : (
                        <View style={styles.pendingDot} />
                      )}
                    </View>

                    {/* Connecting Line */}
                    {!isLast && (
                      <View 
                        style={[
                          styles.timelineLine,
                          isCompleted && styles.timelineLineCompleted,
                          isInProgress && styles.timelineLineHalfCompleted,
                        ]} 
                      />
                    )}
                  </View>

                  {/* Right Column: Step Card */}
                  <Pressable 
                    style={[
                      styles.stepCard,
                      isInProgress && styles.stepCardInProgress,
                      isExpanded && styles.stepCardExpanded,
                    ]}
                    onPress={() => toggleExpand(step.id)}
                  >
                    <View style={styles.stepCardHeader}>
                      <View style={styles.stepTitleRow}>
                        <Text style={styles.stepNumberText}>STEP {step.id}</Text>
                        <View 
                          style={[
                            styles.statusBadge,
                            isCompleted && styles.statusBadgeCompleted,
                            isInProgress && styles.statusBadgeInProgress,
                          ]}
                        >
                          <Text 
                            style={[
                              styles.statusBadgeText,
                              isCompleted && styles.statusBadgeTextCompleted,
                              isInProgress && styles.statusBadgeTextInProgress,
                            ]}
                          >
                            {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                          </Text>
                        </View>
                      </View>
                      {isExpanded ? (
                        <ChevronUp size={16} color={GlobalColors.secondary} />
                      ) : (
                        <ChevronDown size={16} color={GlobalColors.secondary} />
                      )}
                    </View>

                    <Text 
                      style={[
                        styles.stepTitle, 
                        (isCompleted || isInProgress) && styles.stepTitleActive
                      ]}
                    >
                      {step.title}
                    </Text>

                    <Text style={styles.stepDescription}>
                      {step.description}
                    </Text>

                    {/* Expanded Details */}
                    {isExpanded && step.details && (
                      <View style={styles.expandedDetailsBox}>
                        {step.details.map((detail, dIdx) => (
                          <View key={dIdx} style={styles.detailRow}>
                            <View style={styles.bulletDot} />
                            <Text style={styles.detailText}>{detail}</Text>
                          </View>
                        ))}

                        {step.actionLabel && (
                          <Pressable
                            style={styles.stepActionBtn}
                            onPress={() => router.push(step.actionRoute as any || '/laboratory-finder')}
                          >
                            <FlaskConical size={15} color={GlobalColors.primary} />
                            <Text style={styles.stepActionBtnText}>{step.actionLabel}</Text>
                            <ArrowRight size={14} color={GlobalColors.primary} />
                          </Pressable>
                        )}
                      </View>
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>

          {/* Disclaimer Note */}
          <View style={styles.disclaimerCard}>
            <Info size={15} color={GlobalColors.secondary} />
            <Text style={styles.disclaimerText}>
              TRUSTMARK provides guidance based on retrieved authoritative BIS standards. Certification and licence issuance are handled exclusively by the official Bureau of Indian Standards process.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Actions Bar */}
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.findLabBtn, pressed && styles.findLabBtnPressed]}
            onPress={() => router.push('/laboratory-finder')}
          >
            <Building2 size={18} color={GlobalColors.card} />
            <Text style={styles.findLabBtnText}>Find Laboratory</Text>
            <ArrowRight size={16} color={GlobalColors.card} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.askAiBtn, pressed && styles.askAiBtnPressed]}
            onPress={() => router.push('/ai-assistant')}
          >
            <Sparkles size={16} color={GlobalColors.primary} />
            <Text style={styles.askAiBtnText}>Ask TRUSTMARK AI</Text>
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
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: GlobalColors.card,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPressed: {
    backgroundColor: GlobalColors.border,
  },
  headerTextContainer: {
    gap: 4,
  },
  title: {
    ...Typography.heading,
    fontSize: 22,
    color: GlobalColors.dark,
    fontWeight: '700',
    lineHeight: 28,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.secondary,
    lineHeight: 18,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  productCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 12,
  },
  productCardTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  productIconCircle: {
    width: 42,
    height: 42,
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
  readinessSection: {
    gap: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readinessLabel: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  readinessScore: {
    ...Typography.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  progressBarTrack: {
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
  timelineContainer: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
    minHeight: 80,
  },
  timelineIndicatorColumn: {
    alignItems: 'center',
    width: 26,
  },
  timelineNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EAEFED',
    borderWidth: 2,
    borderColor: '#D4DDD9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineNodeCompleted: {
    backgroundColor: GlobalColors.primary,
    borderColor: GlobalColors.primary,
  },
  timelineNodeInProgress: {
    backgroundColor: '#FFFDF9',
    borderColor: GlobalColors.warning,
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GlobalColors.warning,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B5C0BC',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#E1E7E4',
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: GlobalColors.primary,
  },
  timelineLineHalfCompleted: {
    backgroundColor: '#E1E7E4',
  },
  stepCard: {
    flex: 1,
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    marginBottom: 12,
    gap: 6,
  },
  stepCardInProgress: {
    borderColor: '#F9E2AF',
    backgroundColor: '#FFFDF9',
    borderWidth: 1.5,
  },
  stepCardExpanded: {
    borderColor: GlobalColors.primary,
  },
  stepCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepNumberText: {
    ...Typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: GlobalColors.secondary,
    letterSpacing: 0.5,
  },
  statusBadge: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  statusBadgeCompleted: {
    backgroundColor: '#E6F4EE',
  },
  statusBadgeInProgress: {
    backgroundColor: '#FEF8EB',
  },
  statusBadgeText: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: '600',
    color: GlobalColors.secondary,
  },
  statusBadgeTextCompleted: {
    color: GlobalColors.primary,
  },
  statusBadgeTextInProgress: {
    color: '#9C6500',
  },
  stepTitle: {
    ...Typography.section,
    fontSize: 14.5,
    fontWeight: '600',
    color: GlobalColors.dark,
  },
  stepTitleActive: {
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  stepDescription: {
    ...Typography.body,
    fontSize: 12.5,
    color: GlobalColors.secondary,
    lineHeight: 17,
  },
  expandedDetailsBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F0',
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GlobalColors.primary,
  },
  detailText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.dark,
  },
  stepActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E6F4EE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  stepActionBtnText: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  disclaimerCard: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F0F4F2',
    padding: 12,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  disclaimerText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    lineHeight: 15,
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: GlobalColors.background,
    borderTopWidth: 1,
    borderTopColor: '#EBEFEB',
    gap: 10,
  },
  findLabBtn: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  findLabBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  findLabBtnText: {
    ...Typography.section,
    fontSize: 15,
    color: GlobalColors.card,
    fontWeight: '700',
  },
  askAiBtn: {
    backgroundColor: '#E6F4EE',
    borderWidth: 1,
    borderColor: '#CEEAE0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  askAiBtnPressed: {
    backgroundColor: '#D5ECDF',
  },
  askAiBtnText: {
    ...Typography.section,
    fontSize: 14,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
});
