import React, { useState, useRef, useEffect } from 'react';
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
  Send, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ExternalLink, 
  Globe, 
  Layers, 
  Info,
  CheckCircle2,
  Bot,
  User
} from 'lucide-react-native';

import { GlobalColors, Typography } from '@/constants/theme';

interface EvidenceData {
  source: string;
  document: string;
  clause: string;
  page: string;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  evidence?: EvidenceData;
  timestamp: string;
}

const PREDEFINED_REPLIES: Record<string, { text: string; evidence?: EvidenceData }> = {
  'Why this standard?': {
    text: 'The standard IS [VERIFIED_IS_STANDARD] was identified based on the product characteristics you provided, including the product category (drinking water containers), material (food-grade stainless steel) and intended use (hotels & restaurants).\n\nI retrieved and cross-referenced this from official BIS technical committee classifications.',
    evidence: {
      source: 'Bureau of Indian Standards',
      document: '[Verified BIS Document]',
      clause: '[Clause / Section]',
      page: '[Page]',
    },
  },
  'What tests do I need?': {
    text: 'Based on the applicable standard requirements, your product requires 3 primary test evaluations:\n\n1. Material Grade & Chemical Composition Verification (purity of steel)\n2. Acid & Saline Corrosion Leaching Resistance (food-contact safety)\n3. Impact, Drop & Structural Seal Integrity Test (durability & leak prevention)\n\nYou can locate accredited facilities directly in the Laboratory Finder.',
    evidence: {
      source: 'Bureau of Indian Standards',
      document: '[Testing Protocol Guidelines]',
      clause: '[Clause 4.2 & 5.1]',
      page: '[Page 12-14]',
    },
  },
  'What should I do next?': {
    text: 'Here is your recommended immediate action plan:\n\n1. Review the testing requirements with your manufacturing quality team.\n2. Select a recognized laboratory to test production samples.\n3. Prepare the technical file and apply via the official BIS portal (Manakonline).',
    evidence: {
      source: 'Bureau of Indian Standards',
      document: '[Conformity Assessment Scheme]',
      clause: '[Section 3.1]',
      page: '[Page 5]',
    },
  },
  'Explain in Hindi': {
    text: 'नमस्ते! आपके स्टेनलेस स्टील वॉटर बॉटल (1 लीटर) के लिए BIS मानकों के अनुसार आवश्यक जानकारी:\n\n• मानक: IS [VERIFIED_IS_STANDARD]\n• आवश्यक टेस्टिंग: स्टील ग्रेड जांच, लीचिंग टेस्ट और मजबूती परीक्षण\n• अगला कदम: मान्यता प्राप्त प्रयोगशाला (Lab) से टेस्ट रिपोर्ट प्राप्त करें और आवेदन करें।',
    evidence: {
      source: 'भारतीय मानक ब्यूरो (BIS)',
      document: '[Verified BIS Document]',
      clause: '[अनुभाग 4]',
      page: '[पृष्ठ]',
    },
  },
};

const SUGGESTED_PROMPTS = [
  'Why this standard?',
  'What tests do I need?',
  'What should I do next?',
  'Explain in Hindi',
];

export default function AIAssistantScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hi! I can help you understand the BIS information related to your drinking-water bottle.\n\nYou can ask:\n• Why was this standard identified?\n• What testing is required?\n• What should I do next?\n• What does this requirement mean?',
      timestamp: 'Just now',
    },
  ]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/manufacturer-dashboard');
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'EN' ? 'HI' : 'EN';
    setLanguage(nextLang);
    if (nextLang === 'HI') {
      handleSendPrompt('Explain in Hindi');
    }
  };

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Mock AI RAG Response Generation
    setTimeout(() => {
      const match = PREDEFINED_REPLIES[promptText] || {
        text: `Regarding "${promptText}", TRUSTMARK analysed retrieved BIS specifications for your stainless steel drinking-water bottle. Specific clauses require verified laboratory testing and conformity documentation under the applicable BIS framework.`,
        evidence: {
          source: 'Bureau of Indian Standards',
          document: '[Verified BIS Document]',
          clause: '[Clause / Section]',
          page: '[Page]',
        },
      };

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: match.text,
        evidence: match.evidence,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

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

            <View style={styles.headerInfo}>
              <View style={styles.headerTitleRow}>
                <Text style={styles.title}>TRUSTMARK AI</Text>
                <View style={styles.statusPill}>
                  <View style={styles.statusDotGreen} />
                  <Text style={styles.statusPillText}>Evidence-backed</Text>
                </View>
              </View>
              <Text style={styles.subtitle}>Your BIS compliance assistant</Text>
            </View>

            {/* Language Toggle Button */}
            <Pressable 
              style={({ pressed }) => [styles.langToggleBtn, pressed && styles.langToggleBtnPressed]}
              onPress={toggleLanguage}
              accessibilityLabel="Toggle Language"
            >
              <Globe size={14} color={GlobalColors.primary} />
              <Text style={styles.langToggleText}>{language}</Text>
            </Pressable>
          </View>

          {/* Context Banner */}
          <View style={styles.contextBanner}>
            <Layers size={15} color={GlobalColors.primary} />
            <Text style={styles.contextBannerText} numberOfLines={1}>
              Active Context: Stainless Steel Water Bottle (1L) • IS [VERIFIED_IS_STANDARD]
            </Text>
          </View>

          {/* Chat Messages Scroll */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <View 
                  key={msg.id} 
                  style={[
                    styles.messageWrapper, 
                    isUser ? styles.userMessageWrapper : styles.aiMessageWrapper
                  ]}
                >
                  {!isUser && (
                    <View style={styles.aiAvatarCircle}>
                      <Sparkles size={16} color={GlobalColors.card} />
                    </View>
                  )}

                  <View 
                    style={[
                      styles.bubble, 
                      isUser ? styles.userBubble : styles.aiBubble
                    ]}
                  >
                    <Text 
                      style={[
                        styles.bubbleText, 
                        isUser ? styles.userBubbleText : styles.aiBubbleText
                      ]}
                    >
                      {msg.text}
                    </Text>

                    {/* Integrated Evidence Card */}
                    {msg.evidence && (
                      <View style={styles.evidenceCard}>
                        <View style={styles.evidenceHeader}>
                          <ShieldCheck size={16} color={GlobalColors.primary} />
                          <Text style={styles.evidenceTitle}>Retrieved Evidence</Text>
                        </View>

                        <View style={styles.evidenceGrid}>
                          <View style={styles.evidenceRow}>
                            <Text style={styles.evidenceKey}>SOURCE:</Text>
                            <Text style={styles.evidenceVal}>{msg.evidence.source}</Text>
                          </View>
                          <View style={styles.evidenceRow}>
                            <Text style={styles.evidenceKey}>DOCUMENT:</Text>
                            <Text style={styles.evidenceVal}>{msg.evidence.document}</Text>
                          </View>
                          <View style={styles.evidenceRow}>
                            <Text style={styles.evidenceKey}>CLAUSE:</Text>
                            <Text style={styles.evidenceVal}>{msg.evidence.clause}</Text>
                          </View>
                          <View style={styles.evidenceRow}>
                            <Text style={styles.evidenceKey}>PAGE:</Text>
                            <Text style={styles.evidenceVal}>{msg.evidence.page}</Text>
                          </View>
                        </View>

                        <Pressable 
                          style={styles.viewEvidenceBtn}
                          onPress={() => router.push('/compliance-report')}
                        >
                          <Text style={styles.viewEvidenceBtnText}>View in Report</Text>
                          <ExternalLink size={13} color={GlobalColors.primary} />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <View style={styles.aiMessageWrapper}>
                <View style={styles.aiAvatarCircle}>
                  <Sparkles size={16} color={GlobalColors.card} />
                </View>
                <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
                  <ActivityIndicator size="small" color={GlobalColors.primary} />
                  <Text style={styles.typingText}>Searching BIS knowledge base...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Quick Prompts Chips */}
          <View style={styles.promptChipsSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promptChipsContent}
            >
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [
                    styles.promptChip,
                    pressed && styles.promptChipPressed,
                  ]}
                  onPress={() => handleSendPrompt(prompt)}
                >
                  <Text style={styles.promptChipText}>{prompt}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Input & Voice Controls */}
          <View style={styles.inputBarContainer}>
            <View style={styles.inputInnerRow}>
              <TextInput
                style={styles.chatTextInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask about your compliance..."
                placeholderTextColor={GlobalColors.secondary}
                onSubmitEditing={() => handleSendPrompt(inputText)}
                returnKeyType="send"
              />

              <Pressable 
                style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
                onPress={() => {
                  setIsListening(!isListening);
                  if (!isListening) {
                    setInputText('What tests do I need?');
                  }
                }}
                accessibilityLabel="Voice Input"
              >
                <Mic size={18} color={isListening ? GlobalColors.card : GlobalColors.primary} />
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                  pressed && styles.sendButtonPressed,
                ]}
                onPress={() => handleSendPrompt(inputText)}
                disabled={!inputText.trim()}
              >
                <Send size={16} color={GlobalColors.card} />
              </Pressable>
            </View>

            <Text style={styles.footerDisclaimerText}>
              TRUSTMARK provides guidance based on available authoritative sources. Verify critical requirements through the applicable official BIS process.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
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
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...Typography.heading,
    fontSize: 18,
    fontWeight: '700',
    color: GlobalColors.dark,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E6F4EE',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
  statusDotGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GlobalColors.success,
  },
  statusPillText: {
    ...Typography.caption,
    fontSize: 10.5,
    color: GlobalColors.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...Typography.body,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  langToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F4EE',
    borderWidth: 1,
    borderColor: '#CEEAE0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  langToggleBtnPressed: {
    backgroundColor: '#D5ECDF',
  },
  langToggleText: {
    ...Typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0F8F5',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#CEEAE0',
  },
  contextBannerText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.dark,
    fontWeight: '600',
    flex: 1,
  },
  chatScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '92%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
  },
  aiAvatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GlobalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  userBubble: {
    backgroundColor: GlobalColors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: GlobalColors.card,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  userBubbleText: {
    ...Typography.body,
    fontSize: 14,
    color: GlobalColors.card,
    lineHeight: 20,
  },
  aiBubbleText: {
    ...Typography.body,
    fontSize: 13.5,
    color: GlobalColors.dark,
    lineHeight: 20,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  typingText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.secondary,
  },
  evidenceCard: {
    backgroundColor: '#F6F8F7',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E1E7E4',
    gap: 8,
    marginTop: 4,
  },
  evidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  evidenceTitle: {
    ...Typography.caption,
    fontSize: 11.5,
    fontWeight: '700',
    color: GlobalColors.primary,
  },
  evidenceGrid: {
    gap: 4,
  },
  evidenceRow: {
    flexDirection: 'row',
    gap: 6,
  },
  evidenceKey: {
    ...Typography.caption,
    fontSize: 10.5,
    fontWeight: '700',
    color: GlobalColors.secondary,
    width: 65,
  },
  evidenceVal: {
    ...Typography.caption,
    fontSize: 11,
    color: GlobalColors.dark,
    fontWeight: '500',
    flex: 1,
  },
  viewEvidenceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
    alignSelf: 'flex-start',
  },
  viewEvidenceBtnText: {
    ...Typography.caption,
    fontSize: 11.5,
    color: GlobalColors.primary,
    fontWeight: '700',
  },
  promptChipsSection: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#EBEFEB',
  },
  promptChipsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#E6F4EE',
    borderWidth: 1,
    borderColor: '#CEEAE0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  promptChipPressed: {
    backgroundColor: '#D5ECDF',
  },
  promptChipText: {
    ...Typography.caption,
    fontSize: 12,
    color: GlobalColors.primary,
    fontWeight: '600',
  },
  inputBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    backgroundColor: GlobalColors.background,
    gap: 6,
  },
  inputInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlobalColors.card,
    borderWidth: 1,
    borderColor: GlobalColors.border,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  chatTextInput: {
    flex: 1,
    fontSize: 14,
    color: GlobalColors.dark,
    paddingVertical: 8,
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F4EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#E04F44',
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: GlobalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  sendButtonDisabled: {
    backgroundColor: '#B5C5C0',
  },
  footerDisclaimerText: {
    ...Typography.caption,
    fontSize: 10.5,
    color: GlobalColors.secondary,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 8,
  },
});
