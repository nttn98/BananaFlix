import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ route }) => {
  //console.log('Profile param: ', route.params.params.age)

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
  // Mock user data (replace with dynamic data if available)
  const user = {
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png', // Replace with actual avatar URL
    username: route.params.params.username,
    firstName: route.params.params.firstName,
    lastName: route.params.params.lastName,
    email: route.params.params.email,
    age: route.params.params.age,
    gender: route.params.params.gender,
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
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <IonIcon name="arrow-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Profile
        </Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <IonIcon name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.username, { color: theme.colors.text }]}>
            @{user.username}
          </Text>
          <Text
            style={[styles.fullName, { color: theme.colors.textSecondary }]}
          >
            {user.firstName} {user.lastName}
          </Text>
        </View>

        {/* User Details Cards */}
        <View style={styles.detailsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Personal Information
          </Text>

          <View
            style={[
              styles.detailCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.detailRow}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="person-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.detailContent}>
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  First Name
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {user.firstName}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.detailCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.detailRow}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="person-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.detailContent}>
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Last Name
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {user.lastName}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.detailCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <View style={styles.detailRow}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.colors.iconBg },
                ]}
              >
                <IonIcon
                  name="mail-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.detailContent}>
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Email
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {user.email}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailRow2}>
            <View
              style={[
                styles.detailCard,
                styles.halfCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.detailRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: theme.colors.iconBg },
                  ]}
                >
                  <IonIcon
                    name="calendar-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.detailContent}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Age
                  </Text>
                  <Text
                    style={[styles.detailValue, { color: theme.colors.text }]}
                  >
                    {user.age}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.detailCard,
                styles.halfCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <View style={styles.detailRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: theme.colors.iconBg },
                  ]}
                >
                  <IonIcon
                    name={user.gender === 'Male' ? 'male' : 'female'}
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.detailContent}>
                  <Text
                    style={[
                      styles.detailLabel,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Gender
                  </Text>
                  <Text
                    style={[styles.detailValue, { color: theme.colors.text }]}
                  >
                    {user.gender}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <IonIcon name="create-outline" size={20} color="white" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
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
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E50914',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
  },
  username: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  fullName: {
    marginTop: 4,
    fontSize: 16,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailRow2: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
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
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProfileScreen;
