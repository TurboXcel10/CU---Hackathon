import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Info,
  Building2,
  Route,
  HelpCircle
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

// Mock report payload structure matching FastAPI/RAG response schema
const REPORT_DATA = {
  product: {
    name: 'Stainless Steel Drinking Water Bottle',
    attributes: ['1 Litre', 'Stainless Steel', 'Reusable', 'Hotels & Restaurants'],
  },
  standard: {
    code: 'VERIFIED_IS_STANDARD',
    title: 'Specification for Stainless Steel Water Bottles',
    subtitle: 'Based on the product information and retrieved BIS evidence.',
    matchPercentage: 92,
    rationale: 'Retrieved based on material composition (stainless steel food-grade), product capacity (1L), and food-contact storage intended use under BIS classification.',
  },
  signals: [
    'Product category considered',
    'Material characteristics considered',
    'Intended use considered',
    'Relevant BIS evidence retrieved',
  ],
  regulatoryStatus: {
    status: 'Review required',
    description: 'Check the current BIS regulatory information to determine whether mandatory certification or other requirements apply to this product.',
  },
  testingRequirements: [
    {
      id: '01',
      name: 'Material Grade & Chemical Composition',
      explanation: 'Verification of food-contact grade stainless steel purity and elemental composition.',
      status: 'Mandatory Test',
    },
    {
      id: '02',
      name: 'Corrosion & Acid Leaching Resistance',
      explanation: 'Evaluation of acid, saline, and potable water contact safety to prevent heavy metal leaching.',
      status: 'Mandatory Test',
    },
    {
      id: '03',
      name: 'Impact, Drop & Leakage Integrity',
      explanation: 'Structural resistance and seal integrity testing under repeated drop and pressure cycles.',
      status: 'Performance Test',
    },
  ],
  nextSteps: [
    'Review applicable standard',
    'Check current regulatory requirement',
    'Complete required testing',
    'Identify suitable laboratory',
    'Prepare certification/application documents',
  ],
  evidence: {
    title: 'Why TRUSTMARK recommends this',
    source: 'Bureau of Indian Standards',
    document: '[Verified BIS Document]',
    clause: '[Clause / Section]',
    page: '[Page]',
  },
};

export default function ComplianceReportScreen() {
  const router = useRouter();
  const [showRationale, setShowRationale] = useState(false);
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/product-assessment');
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
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color={GlobalColors.dark} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Compliance Report</Text>
            <View style={styles.statusCompletedBadge}>
              <View style={styles.statusDotGreen} />
              <Text style={styles.statusCompletedText}>Analysis completed</Text>
            </View>
          </View>
        </View>

        {/* Scroll Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Summary Card */}
          <View style={styles.productSummaryCard}>
            <Text style={styles.summaryLabel}>ASSESSED PRODUCT</Text>
            <Text style={styles.summaryProductName}>{REPORT_DATA.product.name}</Text>
            <View style={styles.chipsRow}>
              {REPORT_DATA.product.attributes.map((attr, idx) => (
                <View key={idx} style={styles.chip}>
                  <Text style={styles.chipText}>{attr}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section 1: Potentially Applicable Standard */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Potentially Applicable Standard</Text>
            
            <View style={styles.standardCard}>
              <View style={styles.standardHeaderRow}>
                <View style={styles.standardCodeBadge}>
                  <Text style={styles.standardCodeText}>IS {REPORT_DATA.standard.code}</Text>
                </View>
                <View style={styles.matchScoreBadge}>
                  <Text style={styles.matchScoreText}>{REPORT_DATA.standard.matchPercentage}% Match</Text>
                </View>
              </View>

              <Text style={styles.standardTitle}>{REPORT_DATA.standard.title}</Text>
              <Text style={styles.standardSubtitle}>{REPORT_DATA.standard.subtitle}</Text>

              {/* Match Strength Bar */}
              <View style={styles.strengthRow}>
                <View style={styles.strengthTextRow}>
                  <Text style={styles.strengthLabel}>Evidence match</Text>
                  <Text style={styles.strengthValue}>{REPORT_DATA.standard.matchPercentage}%</Text>
                </View>
                <View style={styles.strengthTrack}>
                  <View style={[styles.strengthFill, { width: `${REPORT_DATA.standard.matchPercentage}%` }]} />
                </View>
              </View>

              {/* Rationale Toggle */}
              {showRationale && (
                <View style={styles.rationaleBox}>
                  <Text style={styles.rationaleTitle}>Retrieved Evidence Rationale:</Text>
                  <Text style={styles.rationaleText}>{REPORT_DATA.standard.rationale}</Text>
                </View>
              )}

              <Pressable 
                style={({ pressed }) => [styles.whyButton, pressed && styles.whyButtonPressed]}
                onPress={() => setShowRationale(!showRationale)}
              >
                <HelpCircle size={15} color={GlobalColors.primary} />
                <Text style={styles.whyButtonText}>
                  {showRationale ? 'Hide explanation' : 'Why this standard? →'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Section 2: Applicability Signals */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Applicability Signals</Text>
            <View style={styles.signalsCard}>
              {REPORT_DATA.signals.map((signal, idx) => (
                <View key={idx} style={styles.signalRow}>
                  <CheckCircle2 size={18} color={GlobalColors.primary} />
                  <Text style={styles.signalText}>{signal}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Section 3: Certification / Regulatory Status */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Certification / Regulatory Status</Text>
            <View style={styles.regulatoryCard}>
              <View style={styles.regulatoryHeader}>
                <AlertCircle size={20} color={GlobalColors.warning} />
                <Text style={styles.regulatoryStatusTitle}>{REPORT_DATA.regulatoryStatus.status}</Text>
              </View>
              <Text style={styles.regulatoryDescription}>
                {REPORT_DATA.regulatoryStatus.description}
              </Text>
              <Pressable 
                style={styles.evidenceLinkBtn}
                onPress={() => setActiveEvidenceModal('regulatory')}
              >
                <Text style={styles.evidenceLinkBtnText}>View Evidence</Text>
                <ArrowRight size={14} color={GlobalColors.primary} />
              </Pressable>
            </View>
          </View>

          {/* Section 4: Testing Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Testing Requirements</Text>
            <View style={styles.testsList}>
              {REPORT_DATA.testingRequirements.map((test) => (
                <View key={test.id} style={styles.testCard}>
                  <View style={styles.testCardTop}>
                    <View style={styles.testIdBadge}>
                      <Text style={styles.testIdText}>Test {test.id}</Text>
                    </View>
                    <View style={styles.testStatusBadge}>
                      <Text style={styles.testStatusBadgeText}>{test.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.testName}>{test.name}</Text>
                  <Text style={styles.testExplanation}>{test.explanation}</Text>
                  <Pressable 
                    style={styles.testEvidenceBtn}
                    onPress={() => setActiveEvidenceModal(test.name)}
                  >
                    <Text style={styles.testEvidenceBtnText}>View evidence</Text>
                    <ChevronRight size={14} color={GlobalColors.primary} />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>

          {/* Section 5: Next Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Your Next Steps</Text>
            <View style={styles.stepsCard}>
              {REPORT_DATA.nextSteps.map((step, idx) => (
                <View key={idx} style={styles.stepItem}>
                  <View style={styles.stepNumberCircle}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepItemText}>{step}</Text>
                </View>
              ))}

              <View style={styles.stepsActions}>
                <Pressable
                  style={({ pressed }) => [styles.primaryStepCta, pressed && styles.primaryStepCtaPressed]}
                  onPress={() => router.push('/certification-journey')}
                >
                  <Route size={18} color={GlobalColors.card} />
                  <Text style={styles.primaryStepCtaText}>View Certification Journey</Text>
                  <ArrowRight size={16} color={GlobalColors.card} />
                </Pressable>

                <Pressable
                  style={({ pressed }) => [styles.secondaryStepCta, pressed && styles.secondaryStepCtaPressed]}
                  onPress={() => router.push('/laboratory-finder')}
                >
                  <Building2 size={18} color={GlobalColors.primary} />
                  <Text style={styles.secondaryStepCtaText}>Find Laboratory</Text>
                  <ArrowRight size={16} color={GlobalColors.primary} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Section 6: Evidence Source Card */}
          <View style={styles.section}>
            <Text style={styles.sectionHeaderTitle}>Evidence</Text>
            <View style={styles.evidenceCard}>
              <View style={styles.evidenceCardHeader}>
                <ShieldCheck size={20} color={GlobalColors.primary} />
                <Text style={styles.evidenceCardTitle}>{REPORT_DATA.evidence.title}</Text>
              </View>

              <View style={styles.evidenceDetailsGrid}>
                <View style={styles.evidenceDetailRow}>
                  <Text style={styles.evidenceDetailKey}>Source:</Text>
                  <Text style={styles.evidenceDetailVal}>{REPORT_DATA.evidence.source}</Text>
                </View>
                <View style={styles.evidenceDetailRow}>
                  <Text style={styles.evidenceDetailKey}>Document:</Text>
                  <Text style={styles.evidenceDetailVal}>{REPORT_DATA.evidence.document}</Text>
                </View>
                <View style={styles.evidenceDetailRow}>
                  <Text style={styles.evidenceDetailKey}>Clause:</Text>
                  <Text style={styles.evidenceDetailVal}>{REPORT_DATA.evidence.clause}</Text>
                </View>
                <View style={styles.evidenceDetailRow}>
                  <Text style={styles.evidenceDetailKey}>Page:</Text>
                  <Text style={styles.evidenceDetailVal}>{REPORT_DATA.evidence.page}</Text>
                </View>
              </View>

              <Pressable style={styles.viewSourceButton}>
                <Text style={styles.viewSourceText}>View Source</Text>
                <ExternalLink size={14} color={GlobalColors.primary} />
              </Pressable>

              <View style={styles.trustMessageRow}>
                <Info size={14} color={GlobalColors.secondary} />
                <Text style={styles.trustMessageText}>
                  TRUSTMARK presents guidance based on retrieved authoritative evidence. Final certification decisions remain with the applicable official BIS process.
                </Text>
              </View>
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
          accessibilityLabel="Ask TRUSTMARK AI Assistant"
        >
          <Sparkles size={18} color={GlobalColors.card} />
          <Text style={styles.floatingAiText}>Ask TRUSTMARK AI</Text>
        </Pressable>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEFEB',
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
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...Typography.heading,
    fontSize: 20,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  statusCompletedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalColors.success,
  },
  statusCompletedText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.success,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 100,
    gap: 20,
  },
  productSummaryCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 8,
  },
  summaryLabel: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: GlobalColors.secondary,
    letterSpacing: 0.5,
  },
  summaryProductName: {
    ...Typography.section,
    fontSize: 17,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  chip: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.dark,
    fontWeight: '500',
  },
  section: {
    gap: 10,
  },
  sectionHeaderTitle: {
    ...Typography.section,
    fontSize: 16,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  standardCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: GlobalColors.primary,
    gap: 12,
    shadowColor: GlobalColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  standardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  standardCodeBadge: {
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  standardCodeText: {
    ...Typography.section,
    fontSize: 15,
    color: GlobalColors.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  matchScoreBadge: {
    backgroundColor: '#D7EFE6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchScoreText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  standardTitle: {
    ...Typography.section,
    fontSize: 16,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  standardSubtitle: {
    ...Typography.body,
    fontSize: 13,
    color: GlobalColors.secondary,
    lineHeight: 18,
  },
  strengthRow: {
    gap: 6,
    paddingTop: 4,
  },
  strengthTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  strengthLabel: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  strengthValue: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  strengthTrack: {
    height: 7,
    backgroundColor: '#EAEFED',
    borderRadius: 4,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    backgroundColor: GlobalColors.primary,
    borderRadius: 4,
  },
  rationaleBox: {
    backgroundColor: '#F0F8F5',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CEEAE0',
    gap: 4,
  },
  rationaleTitle: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  rationaleText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.dark,
    lineHeight: 17,
  },
  whyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  whyButtonPressed: {
    opacity: 0.7,
  },
  whyButtonText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  signalsCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 10,
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  signalText: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.dark,
  },
  regulatoryCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F9E2AF',
    gap: 8,
  },
  regulatoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regulatoryStatusTitle: {
    ...Typography.section,
    fontSize: 15,
    fontWeight: '700',
    color: '#9C6500',
  },
  regulatoryDescription: {
    ...Typography.body,
    fontSize: 13,
    color: '#6E5624',
    lineHeight: 18,
  },
  evidenceLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
    alignSelf: 'flex-start',
  },
  evidenceLinkBtnText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  testsList: {
    gap: 10,
  },
  testCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 6,
  },
  testCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testIdBadge: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  testIdText: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  testStatusBadge: {
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  testStatusBadgeText: {
    ...Typography.caption,
    fontSize: 10.5,
    color: GlobalColors.primary,
    fontWeight: '600',
  },
  testName: {
    ...Typography.section,
    fontSize: 14.5,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  testExplanation: {
    ...Typography.body,
    fontSize: 12.5,
    color: GlobalColors.secondary,
    lineHeight: 17,
  },
  testEvidenceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingTop: 4,
    alignSelf: 'flex-start',
  },
  testEvidenceBtnText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  stepsCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 14,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...Typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  stepItemText: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.dark,
    flex: 1,
  },
  stepsActions: {
    gap: 10,
    marginTop: 6,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
  },
  primaryStepCta: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  primaryStepCtaPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryStepCtaText: {
    ...Typography.section,
    fontSize: 15,
    color: GlobalColors.card,
    fontWeight: '700',
  },
  secondaryStepCta: {
    backgroundColor: '#E6F4EE',
    borderWidth: 1,
    borderColor: '#CEEAE0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 14,
    gap: 8,
  },
  secondaryStepCtaPressed: {
    backgroundColor: '#D5ECDF',
  },
  secondaryStepCtaText: {
    ...Typography.section,
    fontSize: 14.5,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  evidenceCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 12,
  },
  evidenceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  evidenceCardTitle: {
    ...Typography.section,
    fontSize: 15,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  evidenceDetailsGrid: {
    backgroundColor: '#F6F8F7',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  evidenceDetailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  evidenceDetailKey: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.secondary,
    width: 75,
  },
  evidenceDetailVal: {
    ...Typography.body,
    fontSize: 12.5,
    color: GlobalColors.dark,
    flex: 1,
    fontWeight: '500',
  },
  viewSourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  viewSourceText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  trustMessageRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    alignItems: 'flex-start',
  },
  trustMessageText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    lineHeight: 15,
    flex: 1,
  },
  floatingAiButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: GlobalColors.dark,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 11,
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
});
