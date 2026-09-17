import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Pressable, 
  ScrollView, 
  Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  X, 
  SlidersHorizontal,
  Info,
  ShieldCheck
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

interface Laboratory {
  id: string;
  name: string;
  location: string;
  distance: string;
  capability: string;
  status: string;
  testingCategory: string;
  applicableStandard: string;
  availableInfo: string;
  officialSource: string;
}

const MOCK_LABS: Laboratory[] = [
  {
    id: 'lab-01',
    name: 'Verified BIS Laboratory 01',
    location: 'Chandigarh, Punjab',
    distance: '18 km',
    capability: 'Mechanical & Leaching Testing Capability',
    status: 'Information available',
    testingCategory: 'Chemical safety, metal leaching & food-contact compliance',
    applicableStandard: 'IS [VERIFIED_IS_STANDARD]',
    availableInfo: 'Facility equipped for heavy-metal migration, potable water resistance, and pressure testing.',
    officialSource: 'Bureau of Indian Standards Laboratory Directory',
  },
  {
    id: 'lab-02',
    name: 'Verified BIS Laboratory 02',
    location: 'Mohali, Punjab',
    distance: '24 km',
    capability: 'Chemical & Grade Composition Testing Capability',
    status: 'Information available',
    testingCategory: 'Material grade verification & corrosion resistance',
    applicableStandard: 'IS [VERIFIED_IS_STANDARD]',
    availableInfo: 'Spectrometry & acid-resistance evaluation for stainless steel grades.',
    officialSource: 'Bureau of Indian Standards Laboratory Directory',
  },
  {
    id: 'lab-03',
    name: 'Verified BIS Laboratory 03',
    location: 'Ludhiana, Punjab',
    distance: '64 km',
    capability: 'Full Conformity & Drop Testing Capability',
    status: 'Information available',
    testingCategory: 'Physical durability, drop test, and leak integrity',
    applicableStandard: 'IS [VERIFIED_IS_STANDARD]',
    availableInfo: 'Full mechanical deformation, drop resistance, and valve/cap seal cycle testing.',
    officialSource: 'Bureau of Indian Standards Laboratory Directory',
  },
];

type FilterType = 'nearby' | 'standard' | 'capability';

export default function LaboratoryFinderScreen() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState('Punjab');
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['nearby', 'standard']);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);
  const [modalLab, setModalLab] = useState<Laboratory | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/manufacturer-dashboard');
    }
  };

  const toggleFilter = (filter: FilterType) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
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
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Find a Laboratory</Text>
            <Text style={styles.subtitle}>Find laboratories relevant to your testing requirements.</Text>
          </View>
        </View>

        {/* Scroll Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Filter & Context Card */}
          <View style={styles.contextCard}>
            <View style={styles.contextTopRow}>
              <View style={styles.contextItem}>
                <Text style={styles.contextLabel}>TESTING FOR</Text>
                <Text style={styles.contextValue}>Stainless Steel Drinking Water Bottle</Text>
              </View>
              <View style={styles.standardBadge}>
                <Text style={styles.standardBadgeText}>IS [VERIFIED_IS_STANDARD]</Text>
              </View>
            </View>

            {/* Location Search Bar */}
            <View style={styles.searchBar}>
              <MapPin size={18} color={GlobalColors.primary} />
              <TextInput
                style={styles.searchInput}
                value={searchLocation}
                onChangeText={setSearchLocation}
                placeholder="Search state or city..."
                placeholderTextColor={GlobalColors.secondary}
              />
              <Search size={18} color={GlobalColors.secondary} />
            </View>

            {/* Filter Pills */}
            <View style={styles.filterPillsRow}>
              <Pressable
                style={[
                  styles.filterPill,
                  activeFilters.includes('nearby') && styles.filterPillActive,
                ]}
                onPress={() => toggleFilter('nearby')}
              >
                <Text 
                  style={[
                    styles.filterPillText, 
                    activeFilters.includes('nearby') && styles.filterPillTextActive
                  ]}
                >
                  Nearby
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterPill,
                  activeFilters.includes('standard') && styles.filterPillActive,
                ]}
                onPress={() => toggleFilter('standard')}
              >
                <Text 
                  style={[
                    styles.filterPillText, 
                    activeFilters.includes('standard') && styles.filterPillTextActive
                  ]}
                >
                  Relevant Standard
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.filterPill,
                  activeFilters.includes('capability') && styles.filterPillActive,
                ]}
                onPress={() => toggleFilter('capability')}
              >
                <Text 
                  style={[
                    styles.filterPillText, 
                    activeFilters.includes('capability') && styles.filterPillTextActive
                  ]}
                >
                  Testing Capability
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Laboratories List */}
          <View style={styles.labsSection}>
            <View style={styles.labsSectionHeader}>
              <Text style={styles.labsSectionTitle}>Recognised Laboratories</Text>
              <Text style={styles.labsCountText}>{MOCK_LABS.length} Available</Text>
            </View>

            {MOCK_LABS.map((lab) => {
              const isSelected = selectedLab === lab.id;
              return (
                <View 
                  key={lab.id} 
                  style={[
                    styles.labCard,
                    isSelected && styles.labCardSelected
                  ]}
                >
                  <View style={styles.labCardHeader}>
                    <View style={styles.labIconCircle}>
                      <Building2 size={20} color={GlobalColors.primary} />
                    </View>
                    <View style={styles.labHeaderInfo}>
                      <Text style={styles.labName}>{lab.name}</Text>
                      <View style={styles.labLocationRow}>
                        <MapPin size={13} color={GlobalColors.secondary} />
                        <Text style={styles.labLocationText}>{lab.location}</Text>
                      </View>
                    </View>
                    <View style={styles.distanceBadge}>
                      <Text style={styles.distanceText}>{lab.distance}</Text>
                    </View>
                  </View>

                  <View style={styles.capabilityBox}>
                    <Text style={styles.capabilityLabel}>Capability:</Text>
                    <Text style={styles.capabilityText}>{lab.capability}</Text>
                  </View>

                  <View style={styles.labStatusRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{lab.status}</Text>
                  </View>

                  <View style={styles.labCardActions}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.detailsBtn,
                        pressed && styles.detailsBtnPressed,
                      ]}
                      onPress={() => setModalLab(lab)}
                    >
                      <Text style={styles.detailsBtnText}>View Details</Text>
                    </Pressable>

                    <Pressable
                      style={({ pressed }) => [
                        styles.selectBtn,
                        isSelected && styles.selectBtnActive,
                        pressed && styles.selectBtnPressed,
                      ]}
                      onPress={() => setSelectedLab(isSelected ? null : lab.id)}
                    >
                      <Text 
                        style={[
                          styles.selectBtnText,
                          isSelected && styles.selectBtnTextActive
                        ]}
                      >
                        {isSelected ? 'Selected ✓' : 'Select'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Disclaimer Footer */}
          <View style={styles.disclaimerCard}>
            <Info size={15} color={GlobalColors.secondary} />
            <Text style={styles.disclaimerText}>
              Laboratory information should be verified against the current official BIS laboratory listing. Demonstration data displayed.
            </Text>
          </View>
        </ScrollView>

        {/* Floating AI Assistant Button */}
        <Pressable 
          style={({ pressed }) => [
            styles.floatingAiButton,
            pressed && styles.floatingAiButtonPressed,
          ]}
          onPress={() => router.push('/ai-assistant')}
          accessibilityLabel="Ask TRUSTMARK AI"
        >
          <Sparkles size={18} color={GlobalColors.card} />
          <Text style={styles.floatingAiText}>TRUSTMARK AI</Text>
        </Pressable>

        {/* Details Bottom Sheet Modal */}
        <Modal
          visible={!!modalLab}
          transparent
          animationType="slide"
          onRequestClose={() => setModalLab(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheetCard}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <ShieldCheck size={22} color={GlobalColors.primary} />
                  <Text style={styles.modalTitle}>Laboratory Details</Text>
                </View>
                <Pressable 
                  style={styles.modalCloseBtn}
                  onPress={() => setModalLab(null)}
                >
                  <X size={20} color={GlobalColors.secondary} />
                </Pressable>
              </View>

              {modalLab && (
                <View style={styles.modalContent}>
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Laboratory</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.name}</Text>
                  </View>

                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Location</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.location} ({modalLab.distance})</Text>
                  </View>

                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Relevant Testing Category</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.testingCategory}</Text>
                  </View>

                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Applicable Standard</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.applicableStandard}</Text>
                  </View>

                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Available Information</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.availableInfo}</Text>
                  </View>

                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailKey}>Official Source</Text>
                    <Text style={styles.modalDetailVal}>{modalLab.officialSource}</Text>
                  </View>

                  <Pressable style={styles.officialSourceBtn}>
                    <Text style={styles.officialSourceBtnText}>Open Official Source</Text>
                    <ExternalLink size={16} color={GlobalColors.card} />
                  </Pressable>

                  <Text style={styles.modalDisclaimer}>
                    Laboratory information should be verified against the current official BIS laboratory listing.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
    paddingBottom: 100,
    gap: 16,
  },
  contextCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    gap: 12,
  },
  contextTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  contextItem: {
    flex: 1,
    gap: 2,
  },
  contextLabel: {
    ...Typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: GlobalColors.secondary,
    letterSpacing: 0.5,
  },
  contextValue: {
    ...Typography.section,
    fontSize: 14.5,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  standardBadge: {
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  standardBadgeText: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlobalColors.background,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: GlobalColors.dark,
    padding: 0,
  },
  filterPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterPillActive: {
    backgroundColor: '#E6F4EE',
    borderColor: GlobalColors.primary,
  },
  filterPillText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  labsSection: {
    gap: 12,
  },
  labsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labsSectionTitle: {
    ...Typography.section,
    fontSize: 16,
    color: GlobalColors.dark,
    fontWeight: '700',
  },
  labsCountText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
    fontWeight: '600',
  },
  labCard: {
    backgroundColor: GlobalColors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: GlobalColors.border,
    gap: 12,
  },
  labCardSelected: {
    borderColor: GlobalColors.primary,
    backgroundColor: '#F0F8F5',
  },
  labCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labHeaderInfo: {
    flex: 1,
    gap: 2,
  },
  labName: {
    ...Typography.section,
    fontSize: 15,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  labLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labLocationText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  distanceBadge: {
    backgroundColor: '#F0F4F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  distanceText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.dark,
    fontWeight: '600',
  },
  capabilityBox: {
    backgroundColor: '#F6F8F7',
    padding: 10,
    borderRadius: 10,
    gap: 2,
  },
  capabilityLabel: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: GlobalColors.secondary,
  },
  capabilityText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.dark,
  },
  labStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalColors.success,
  },
  statusText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.success,
    fontWeight: '600',
  },
  labCardActions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
  },
  detailsBtn: {
    flex: 1,
    backgroundColor: '#F0F4F2',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsBtnPressed: {
    backgroundColor: '#E4EAE7',
  },
  detailsBtnText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.dark,
    fontWeight: '600',
  },
  selectBtn: {
    flex: 1,
    backgroundColor: '#E6F4EE',
    borderWidth: 1,
    borderColor: '#CEEAE0',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnActive: {
    backgroundColor: GlobalColors.primary,
    borderColor: GlobalColors.primary,
  },
  selectBtnPressed: {
    opacity: 0.9,
  },
  selectBtnText: {
    ...Typography.caption,
    fontSize: 13,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  selectBtnTextActive: {
    color: GlobalColors.card,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(16, 35, 31, 0.6)',
    justifyContent: 'flex-end',
  },
  modalSheetCard: {
    backgroundColor: GlobalColors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
    gap: 16,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.border,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    ...Typography.section,
    fontSize: 17,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalContent: {
    gap: 12,
  },
  modalDetailItem: {
    gap: 2,
  },
  modalDetailKey: {
    ...Typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: GlobalColors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  modalDetailVal: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.dark,
  },
  officialSourceBtn: {
    backgroundColor: GlobalColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 6,
  },
  officialSourceBtnText: {
    ...Typography.section,
    fontSize: 14.5,
    color: GlobalColors.card,
    fontWeight: '700',
  },
  modalDisclaimer: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.secondary,
    textAlign: 'center',
    lineHeight: 15,
  },
});
