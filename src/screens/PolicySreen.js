import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const PolicyScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const goBack = () => {
    navigation.goBack();
    Orientation.lockToPortrait();
    SystemNavigationBar.fullScreen(false);
  };

  const sections = [
    {
      icon: 'information-circle-outline',
      title: '1. Introduction',
      content:
        'By using this application, you agree to comply with and be bound by these terms. BananaFlix provides unlimited streaming entertainment for your enjoyment.',
    },
    {
      icon: 'shield-checkmark-outline',
      title: '2. Privacy Policy',
      content:
        'We are committed to protecting your privacy. Your data will not be shared with third parties without your consent. We use industry-standard encryption to protect your information.',
    },
    {
      icon: 'person-outline',
      title: '3. User Responsibilities',
      content:
        'Users are expected to use the application responsibly and avoid any harmful activities. You must be at least 13 years old to use this service.',
    },
    {
      icon: 'create-outline',
      title: '4. Modifications',
      content:
        'We reserve the right to modify these terms at any time. Please check this page regularly for updates. Continued use of the service constitutes acceptance of changes.',
    },
    {
      icon: 'mail-outline',
      title: '5. Contact Us',
      content:
        'If you have any questions about these terms, please contact us at netflix.support@mail.ru. We typically respond within 24-48 hours.',
    },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header with Gradient */}
      <LinearGradient
        colors={[
          theme.mode === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)',
          theme.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
          'transparent',
        ]}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <IonIcon name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Terms & Policies
        </Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Card */}
        <View
          style={[
            styles.welcomeCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <IonIcon
            name="document-text"
            size={48}
            color={theme.colors.primary}
          />
          <Text style={[styles.welcomeTitle, { color: theme.colors.text }]}>
            Welcome to BananaFlix
          </Text>
          <Text
            style={[styles.welcomeText, { color: theme.colors.textSecondary }]}
          >
            Please read the following terms and policies carefully before using
            our service.
          </Text>
        </View>

        {/* Sections */}
        {sections.map((section, index) => (
          <View
            key={index}
            style={[
              styles.sectionCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name={section.icon}
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {section.title}
              </Text>
            </View>
            <Text
              style={[
                styles.sectionContent,
                { color: theme.colors.textSecondary },
              ]}
            >
              {section.content}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            Last updated: November 2024
          </Text>
          <Text
            style={[styles.footerText, { color: theme.colors.textSecondary }]}
          >
            © 2024 BananaFlix. All rights reserved.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 56,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    marginBottom: 4,
  },
});

export default PolicyScreen;
