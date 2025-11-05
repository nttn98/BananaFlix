import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function AboutScreen() {
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

  const features = [
    {
      icon: 'film-outline',
      title: 'Unlimited Movies',
      description: 'Stream thousands of movies anytime, anywhere',
    },
    {
      icon: 'tv-outline',
      title: 'HD Quality',
      description: 'Watch in stunning high definition quality',
    },
    {
      icon: 'download-outline',
      title: 'Download & Watch',
      description: 'Download movies to watch offline',
    },
    {
      icon: 'people-outline',
      title: 'Multiple Profiles',
      description: 'Create profiles for different family members',
    },
    {
      icon: 'heart-outline',
      title: 'My List',
      description: 'Save your favorite movies to watch later',
    },
    {
      icon: 'search-outline',
      title: 'Smart Search',
      description: 'Find movies quickly with advanced search',
    },
  ];

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
          About BananaFlix
        </Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        opacity={fadeAnim}
      >
        {/* Logo Section */}
        <View style={[styles.logoCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={styles.logoEmoji}>🍌</Text>
          <Text style={[styles.appName, { color: theme.colors.text }]}>
            BananaFlix
          </Text>
          <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
            Your Ultimate Streaming Experience
          </Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About Us
          </Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            BananaFlix is your go-to streaming platform for unlimited entertainment. 
            We bring you the best collection of movies from around the world, all in 
            one place. Enjoy seamless streaming, personalized recommendations, and a 
            user-friendly interface designed for the ultimate viewing experience.
          </Text>
        </View>

        {/* Features */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Features
          </Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIconContainer, { backgroundColor: theme.colors.iconBg }]}>
                <IonIcon name={feature.icon} size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Company Info */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Company Information
          </Text>
          <View style={styles.infoRow}>
            <IonIcon name="business-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              BananaFlix Entertainment Inc.
            </Text>
          </View>
          <View style={styles.infoRow}>
            <IonIcon name="location-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              123 Streaming Street, Media City
            </Text>
          </View>
          <View style={styles.infoRow}>
            <IonIcon name="mail-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              support@bananaflix.com
            </Text>
          </View>
          <View style={styles.infoRow}>
            <IonIcon name="globe-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              www.bananaflix.com
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            © 2024 BananaFlix. All rights reserved.
          </Text>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            Made with ❤️ for movie lovers
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
  logoCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  versionBadge: {
    backgroundColor: '#E50914',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  versionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

