import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { userLogoutAPI } from '../api/logoutAPI';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ route }) => {
  console.log('setting', route);
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await userLogoutAPI();
      if (response.success) {
        console.log('Logged out successfully');
        navigation.navigate('LoginScreen');
      } else {
        console.error('Logout failed:', response.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const profileNavigation = () => {
    //console.log("passing to pro", route)
    navigation.navigate('ProfileDetail', route.params);
  };

  const policyNavigation = () => {
    navigation.navigate('PolicyScreen');
  };

  const notiNavigation = () => {
    navigation.navigate('NotificationScreens');
  };

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
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <IonIcon name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Settings
          </Text>
          <View style={{ width: 40 }} />
        </View>
      </LinearGradient>

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <TouchableOpacity
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
          onPress={profileNavigation}
        >
          <View style={styles.profileIconContainer}>
            <IonIcon name="person" size={32} color="#E50914" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.text }]}>
              My Profile
            </Text>
            <Text
              style={[
                styles.profileSubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              Manage your account
            </Text>
          </View>
          <IonIcon
            name="chevron-forward"
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            Appearance
          </Text>

          {/* Theme Switcher */}
          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={toggleTheme}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name={isDarkMode ? 'moon' : 'sunny'}
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <View>
                <Text
                  style={[styles.menuItemText, { color: theme.colors.text }]}
                >
                  Theme
                </Text>
                <Text
                  style={[
                    styles.menuItemSubtext,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.themeToggle,
                { backgroundColor: isDarkMode ? '#E50914' : '#ccc' },
              ]}
            >
              <Animated.View
                style={[
                  styles.themeToggleCircle,
                  { transform: [{ translateX: isDarkMode ? 22 : 2 }] },
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
          >
            General
          </Text>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={notiNavigation}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="notifications-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Notifications
              </Text>
            </View>
            <IonIcon
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={policyNavigation}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="document-text-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Terms & Policies
              </Text>
            </View>
            <IonIcon
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="help-circle-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                Help & Support
              </Text>
            </View>
            <IonIcon
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="information-circle-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                About
              </Text>
            </View>
            <IonIcon
              name="chevron-forward"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IonIcon name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>BananaFlix v1.0.0</Text>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileSubtext: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
  menuItemSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
  themeToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  themeToggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 40,
  },
});

export default SettingsScreen;
