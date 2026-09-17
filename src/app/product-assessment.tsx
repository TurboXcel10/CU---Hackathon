import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mic, 
  Camera, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Info
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

const ANALYSIS_STAGES = [
  'Understanding product',
  'Identifying product category',
  'Searching BIS knowledge',
  'Checking relevant requirements',
  'Preparing evidence',
];

export default function ProductAssessmentScreen() {
  const router = useRouter();

  // Form State
  const [description, setDescription] = useState(
    'We manufacture 1 litre stainless-steel reusable drinking-water bottles supplied to restaurants and hotels.'
  );
  const [productName, setProductName] = useState('Drinking Water Bottle');
  const [material, setMaterial] = useState('Stainless Steel');
  const [capacity, setCapacity] = useState('1 Litre');
  const [usage, setUsage] = useState('Restaurants & Hotels');
  const [isReusable, setIsReusable] = useState(true);
  const [originCountry, setOriginCountry] = useState('India');

  // Loading / Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/manufacturer-dashboard');
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStageIndex(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setCurrentStageIndex((prevIndex) => {
          if (prevIndex < ANALYSIS_STAGES.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnalyzing(false);
              router.push('/compliance-report');
            }, 600);
            return prevIndex;
          }
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
              <Text style={styles.title}>Tell us about your product</Text>
              <Text style={styles.subtitle}>
                You don't need to know the IS code. Describe what you manufacture.
              </Text>
            </View>
          </View>

          {/* Form ScrollView */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Primary Input Card */}
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Natural Language Description</Text>
              <TextInput
                style={styles.multilineInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Example: We manufacture 1 litre stainless-steel reusable drinking-water bottles for restaurants and hotels."
                placeholderTextColor={GlobalColors.secondary}
                multiline
                numberOfLines={4}
                maxLength={500}
                textAlignVertical="top"
              />
              
              <View style={styles.inputCardFooter}>
                <View style={styles.inputActions}>
                  <Pressable style={styles.toolIconBtn}>
                    <Mic size={18} color={GlobalColors.primary} />
                  </Pressable>
                  <Pressable style={styles.toolIconBtn}>
                    <Camera size={18} color={GlobalColors.primary} />
                  </Pressable>
                </View>
                <Text style={styles.charCount}>{description.length} / 500</Text>
              </View>
            </View>

            {/* AI Understanding Preview Card */}
            <View style={styles.aiPreviewCard}>
              <View style={styles.aiPreviewHeader}>
                <Sparkles size={18} color={GlobalColors.primary} />
                <Text style={styles.aiPreviewTitle}>TRUSTMARK will analyse:</Text>
              </View>
              <View style={styles.aiPreviewList}>
                {['Product category', 'Material composition', 'Capacity / Dimensions', 'Intended use', 'Relevant BIS standards'].map((item, idx) => (
                  <View key={idx} style={styles.aiPreviewItem}>
                    <CheckCircle2 size={16} color={GlobalColors.primary} />
                    <Text style={styles.aiPreviewItemText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.disclaimerRow}>
                <Info size={13} color={GlobalColors.secondary} />
                <Text style={styles.disclaimerText}>
                  Provides potentially applicable standards & evidence-backed guidance.
                </Text>
              </View>
            </View>

            {/* Section: Structured Product Details */}
            <View style={styles.structuredSection}>
              <Text style={styles.sectionHeaderTitle}>Or enter product details</Text>

              {/* Product Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Product name</Text>
                <TextInput
                  style={styles.singleLineInput}
                  value={productName}
                  onChangeText={setProductName}
                  placeholder="e.g. Drinking Water Bottle"
                  placeholderTextColor={GlobalColors.secondary}
                />
              </View>

              {/* Material & Capacity Row */}
              <View style={styles.fieldRow}>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Material</Text>
                  <TextInput
                    style={styles.singleLineInput}
                    value={material}
                    onChangeText={setMaterial}
                    placeholder="e.g. Stainless Steel"
                    placeholderTextColor={GlobalColors.secondary}
                  />
                </View>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Capacity</Text>
                  <TextInput
                    style={styles.singleLineInput}
                    value={capacity}
                    onChangeText={setCapacity}
                    placeholder="e.g. 1 Litre"
                    placeholderTextColor={GlobalColors.secondary}
                  />
                </View>
              </View>

              {/* Usage */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Usage</Text>
                <TextInput
                  style={styles.singleLineInput}
                  value={usage}
                  onChangeText={setUsage}
                  placeholder="e.g. Restaurants & Hotels"
                  placeholderTextColor={GlobalColors.secondary}
                />
              </View>

              {/* Reusable & Origin Row */}
              <View style={styles.fieldRow}>
                {/* Reusable Toggle */}
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Reusable?</Text>
                  <View style={styles.toggleRow}>
                    <Pressable
                      style={[styles.toggleBtn, isReusable && styles.toggleBtnActive]}
                      onPress={() => setIsReusable(true)}
                    >
                      <Text style={[styles.toggleBtnText, isReusable && styles.toggleBtnTextActive]}>Yes</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.toggleBtn, !isReusable && styles.toggleBtnActive]}
                      onPress={() => setIsReusable(false)}
                    >
                      <Text style={[styles.toggleBtnText, !isReusable && styles.toggleBtnTextActive]}>No</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Country of Origin */}
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Manufactured in</Text>
                  <TextInput
                    style={styles.singleLineInput}
                    value={originCountry}
                    onChangeText={setOriginCountry}
                    placeholder="e.g. India"
                    placeholderTextColor={GlobalColors.secondary}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Action */}
          <View style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
                isAnalyzing && styles.primaryButtonDisabled
              ]}
              onPress={handleStartAnalysis}
              disabled={isAnalyzing}
            >
              <Text style={styles.primaryButtonText}>Analyse Product</Text>
              <ArrowRight size={18} color={GlobalColors.card} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Fullscreen Animated Loading Overlay */}
      {isAnalyzing && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingModalCard}>
            <View style={styles.loadingHeader}>
              <ActivityIndicator size="small" color={GlobalColors.primary} />
              <Text style={styles.loadingModalTitle}>Analysing Product Requirements</Text>
            </View>

            <View style={styles.stagesContainer}>
              {ANALYSIS_STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <View key={idx} style={styles.stageRow}>
                    <View 
                      style={[
                        styles.stageCheckCircle, 
                        isCompleted && styles.stageCheckCircleCompleted
                      ]}
                    >
                      {isCompleted ? (
                        <Check size={12} color={GlobalColors.card} strokeWidth={3} />
                      ) : (
                        <View style={styles.stageDotPending} />
                      )}
                    </View>
                    <Text 
                      style={[
                        styles.stageText, 
                        isCompleted && styles.stageTextCompleted,
                        isCurrent && styles.stageTextCurrent
                      ]}
                    >
                      {stage}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
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
  inputCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 10,
  },
  inputLabel: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  multilineInput: {
    ...Typography.body,
    fontSize: 14.5,
    color: GlobalColors.dark,
    minHeight: 85,
    lineHeight: 21,
    padding: 0,
  },
  inputCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
  },
  inputActions: {
    flexDirection: 'row',
    gap: 8,
  },
  toolIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  charCount: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.secondary,
  },
  aiPreviewCard: {
    backgroundColor: '#F0F8F5',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CEEAE0',
    gap: 10,
  },
  aiPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiPreviewTitle: {
    ...Typography.section,
    fontSize: 14.5,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  aiPreviewList: {
    gap: 6,
    paddingLeft: 4,
  },
  aiPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiPreviewItemText: {
    ...Typography.body,
    fontSize: 13,
    color: GlobalColors.dark,
  },
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#DEEFE9',
  },
  disclaimerText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    flex: 1,
    lineHeight: 14,
  },
  structuredSection: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 14,
  },
  sectionHeaderTitle: {
    ...Typography.section,
    fontSize: 15,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fieldLabel: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '600',
    color: GlobalColors.secondary,
  },
  singleLineInput: {
    backgroundColor: GlobalColors.background,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: GlobalColors.dark,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: GlobalColors.background,
    borderRadius: 12,
    padding: 3,
    borderWidth: 1,
    borderColor: GlobalColors.border,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 9,
  },
  toggleBtnActive: {
    backgroundColor: GlobalColors.primary,
  },
  toggleBtnText: {
    ...Typography.caption,
    fontSize: 13,
    fontWeight: '600',
    color: GlobalColors.secondary,
  },
  toggleBtnTextActive: {
    color: GlobalColors.card,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: GlobalColors.background,
    borderTopWidth: 1,
    borderTopColor: '#EBEFEB',
  },
  primaryButton: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    gap: 8,
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    ...Typography.section,
    fontSize: 16,
    color: GlobalColors.card,
    fontWeight: '700',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 35, 31, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 999,
  },
  loadingModalCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: GlobalColors.card,
    borderRadius: 20,
    padding: 24,
    gap: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  loadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.border,
  },
  loadingModalTitle: {
    ...Typography.section,
    fontSize: 16,
    fontWeight: '700',
    color: GlobalColors.dark,
    flex: 1,
  },
  stagesContainer: {
    gap: 12,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stageCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EAEFED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageCheckCircleCompleted: {
    backgroundColor: GlobalColors.primary,
  },
  stageDotPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#BAC5C2',
  },
  stageText: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.secondary,
  },
  stageTextCompleted: {
    color: GlobalColors.dark,
    fontWeight: '600',
  },
  stageTextCurrent: {
    color: GlobalColors.primary,
    fontWeight: '700',
  },
});
