import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [expandedFAQ, setExpandedFAQ] = React.useState(null);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Tap on the "Register" button on the login screen, fill in your details including username, email, age, and password, then tap "Create Account".',
    },
    {
      question: 'How do I add movies to My List?',
      answer: 'While browsing movies, tap the "+" icon on any movie poster or the "My List" button on the movie details page to add it to your personal list.',
    },
    {
      question: 'Can I download movies to watch offline?',
      answer: 'Yes! On the movie details page, tap the download icon. Downloaded movies will be available in your Downloads section.',
    },
    {
      question: 'How do I change my profile information?',
      answer: 'Go to Settings > Profile, then tap "Edit Profile" to update your personal information.',
    },
    {
      question: 'How do I switch between Dark and Light mode?',
      answer: 'Go to Settings and toggle the "Dark Mode" switch under the Appearance section.',
    },
    {
      question: 'What video quality is available?',
      answer: 'BananaFlix streams in HD quality. The quality may adjust automatically based on your internet connection.',
    },
    {
      question: 'How do I search for movies?',
      answer: 'Tap the search icon in the navigation bar, then type the movie title, genre, or actor name you\'re looking for.',
    },
    {
      question: 'Can I watch on multiple devices?',
      answer: 'Yes! Your account can be accessed from multiple devices. Your watch history and My List sync across all devices.',
    },
  ];

  const contactOptions = [
    {
      icon: 'mail-outline',
      title: 'Email Support',
      description: 'support@bananaflix.com',
      action: () => Linking.openURL('mailto:support@bananaflix.com'),
    },
    {
      icon: 'call-outline',
      title: 'Phone Support',
      description: '+1 (800) 123-4567',
      action: () => Linking.openURL('tel:+18001234567'),
    },
    {
      icon: 'chatbubble-outline',
      title: 'Live Chat',
      description: 'Available 24/7',
      action: () => {},
    },
    {
      icon: 'logo-twitter',
      title: 'Twitter',
      description: '@BananaFlix',
      action: () => Linking.openURL('https://twitter.com/bananaflix'),
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <LinearGradient
        colors={[
          theme.mode === 'dark' ? '#1a0000' : '#FFE5E5',
          theme.colors.background,
        ]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <IonIcon name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Help & Support
        </Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        opacity={fadeAnim}
      >
        {/* Welcome Card */}
        <View style={[styles.welcomeCard, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.iconBg }]}>
            <IonIcon name="help-circle" size={48} color={theme.colors.primary} />
          </View>
          <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>
            How can we help you?
          </Text>
          <Text style={[styles.welcomeText, { color: theme.colors.textSecondary }]}>
            Find answers to common questions or contact our support team
          </Text>
        </View>

        {/* Contact Options */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Contact Us
          </Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.contactOption,
                { borderBottomColor: theme.colors.border },
                index === contactOptions.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={option.action}
            >
              <View style={[styles.contactIconContainer, { backgroundColor: theme.colors.iconBg }]}>
                <IonIcon name={option.icon} size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.contactContent}>
                <Text style={[styles.contactTitle, { color: theme.colors.text }]}>
                  {option.title}
                </Text>
                <Text style={[styles.contactDescription, { color: theme.colors.textSecondary }]}>
                  {option.description}
                </Text>
              </View>
              <IonIcon name="chevron-forward" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Frequently Asked Questions
          </Text>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.faqItem,
                { borderBottomColor: theme.colors.border },
                index === faqs.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => toggleFAQ(index)}
            >
              <View style={styles.faqHeader}>
                <Text style={[styles.faqQuestion, { color: theme.colors.text }]}>
                  {faq.question}
                </Text>
                <IonIcon
                  name={expandedFAQ === index ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              {expandedFAQ === index && (
                <Text style={[styles.faqAnswer, { color: theme.colors.textSecondary }]}>
                  {faq.answer}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Tips
          </Text>
          <View style={styles.tipItem}>
            <IonIcon name="bulb-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
              Use the search feature to quickly find your favorite movies
            </Text>
          </View>
          <View style={styles.tipItem}>
            <IonIcon name="bulb-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
              Download movies for offline viewing when you have WiFi
            </Text>
          </View>
          <View style={styles.tipItem}>
            <IonIcon name="bulb-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
              Create multiple profiles for different family members
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Still need help? Our support team is available 24/7
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
  },
  faqItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 12,
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

