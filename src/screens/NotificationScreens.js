import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const notifications = [
  {
    id: '1',
    title: 'New episode available for Stranger Things',
    description: 'Watch the latest episode now!',
  },
  {
    id: '2',
    title: 'Top 10 movies to watch this week',
    description: 'Here are some recommendations for you.',
  },
  {
    id: '3',
    title: 'Breaking News: New movie release',
    description: 'Check out the new action movie this Friday.',
  },
  {
    id: '4',
    title: 'Upcoming season for The Witcher',
    description: 'The new season starts next month!',
  },
  {
    id: '5',
    title: 'Limited-time discount on subscriptions',
    description: 'Save 20% on annual plans this week only.',
  },
  {
    id: '6',
    title: 'Fan favorite: Best comedy shows',
    description: 'Laugh out loud with these top-rated comedies.',
  },
  {
    id: '7',
    title: 'Exclusive behind-the-scenes content',
    description: 'See how your favorite shows are made.',
  },
  {
    id: '8',
    title: 'Action movies marathon this weekend',
    description: 'Tune in for non-stop action-packed entertainment.',
  },
  {
    id: '9',
    title: 'Documentary of the month',
    description: 'Explore the wonders of the ocean in our latest docuseries.',
  },
  {
    id: '10',
    title: 'Live Q&A with your favorite cast',
    description: 'Join us live this Saturday for an interactive session.',
  },
  {
    id: '11',
    title: 'Trending: Top dramas to binge-watch',
    description: 'Don’t miss out on these must-watch dramas.',
  },
  {
    id: '12',
    title: 'New animated series for kids',
    description: 'Perfect family entertainment now streaming.',
  },
  {
    id: '13',
    title: 'Watch party with friends',
    description: 'Create a watch party and enjoy movies together.',
  },
  {
    id: '14',
    title: 'Awards night special',
    description: 'Catch the highlights from the biggest awards show.',
  },
  {
    id: '15',
    title: 'Your personalized recommendations',
    description: 'Movies and series handpicked just for you.',
  },
  {
    id: '16',
    title: 'Sci-fi adventure of the year',
    description: 'Don’t miss the most anticipated sci-fi release.',
  },
  {
    id: '17',
    title: 'Weekly quiz: Guess the movie',
    description: 'Test your knowledge and win exclusive rewards.',
  },
  {
    id: '18',
    title: 'New feature: Download episodes offline',
    description: 'Enjoy your favorite shows without the internet.',
  },
  {
    id: '19',
    title: 'Live sports streaming available',
    description: 'Catch the excitement of live sports from anywhere.',
  },
  {
    id: '20',
    title: 'Top horror films to scare you',
    description: 'Get ready for a thrilling night of horror.',
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [readNotifications, setReadNotifications] = React.useState(new Set());
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

  const toggleRead = id => {
    setReadNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getNotificationIcon = title => {
    if (title.includes('episode') || title.includes('season'))
      return 'tv-outline';
    if (title.includes('movie') || title.includes('film'))
      return 'film-outline';
    if (title.includes('discount') || title.includes('subscription'))
      return 'pricetag-outline';
    if (title.includes('Live') || title.includes('Q&A'))
      return 'videocam-outline';
    if (title.includes('Download')) return 'download-outline';
    return 'notifications-outline';
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
        <Text style={[styles.headerText, { color: theme.colors.text }]}>
          Notifications
        </Text>
        <TouchableOpacity style={styles.markAllButton}>
          <IonIcon name="checkmark-done" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </LinearGradient>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isRead = readNotifications.has(item.id);
            return (
              <TouchableOpacity
                style={[
                  styles.notification,
                  {
                    backgroundColor: isRead
                      ? theme.colors.background
                      : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => toggleRead(item.id)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: theme.colors.iconBg },
                  ]}
                >
                  <IonIcon
                    name={getNotificationIcon(item.title)}
                    size={24}
                    color={
                      isRead ? theme.colors.textSecondary : theme.colors.primary
                    }
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: isRead
                          ? theme.colors.textSecondary
                          : theme.colors.text,
                        opacity: isRead ? 0.6 : 1,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.description,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.readButton}
                  onPress={() => toggleRead(item.id)}
                >
                  <IonIcon
                    name={
                      isRead ? 'checkmark-circle' : 'checkmark-circle-outline'
                    }
                    size={24}
                    color={
                      isRead ? theme.colors.primary : theme.colors.textSecondary
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  markAllButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notification: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  readButton: {
    padding: 8,
  },
});

export default NotificationScreen;
