import {
  Image,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { similarMoviesAPI } from '../api/similarMoviesAPI';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import SimilarMovies from '../components/SimilarMovies';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import React from 'react';

const { width } = Dimensions.get('window');

export default function MovieDetails({ route }) {
  const navigation = useNavigation();
  const { movie } = route.params;
  const { theme } = useTheme();
  const [similarMoviesList, setSimilarMoviesList] = React.useState([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const similarMoviesListAPICall = async () => {
      try {
        const similarMovies = await similarMoviesAPI(movie._id);
        setSimilarMoviesList(similarMovies);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    similarMoviesListAPICall();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [movie]);

  const goBack = () => {
    navigation.goBack();
    Orientation.lockToPortrait();
    SystemNavigationBar.fullScreen(false);
  };

  const playMovie = (movieID, movieLink, movieTitle) => {
    navigation.navigate('MoviesVideoPlayer', {
      movieID,
      movieLink,
      movieTitle,
    });
  };

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Animated Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={[
            theme.mode === 'dark'
              ? 'rgba(0,0,0,0.95)'
              : 'rgba(255,255,255,0.95)',
            theme.mode === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
            'transparent',
          ]}
          style={styles.headerGradient}
        >
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <IonIcon name="arrow-back" size={28} color={theme.colors.text} />
          </TouchableOpacity>
          <Text
            style={[styles.headerTitle, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {movie.title}
          </Text>
          <View style={{ width: 40 }} />
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {/* Movie Poster with Gradient Overlay */}
        <View style={styles.posterContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movie.posterPath}`,
            }}
            style={styles.moviePoster}
          />
          <LinearGradient
            colors={['transparent', theme.colors.background]}
            style={styles.posterGradient}
          />

          {/* Floating Back Button */}
          <TouchableOpacity onPress={goBack} style={styles.floatingBackButton}>
            <View style={styles.backButtonCircle}>
              <IonIcon name="arrow-back" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View style={styles.movieDetailsContainer}>
          <Text style={[styles.movieTitle, { color: theme.colors.text }]}>
            {movie.title}
          </Text>

          {/* Meta Info */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <IonIcon
                name="calendar-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[styles.metaText, { color: theme.colors.textSecondary }]}
              >
                {new Date(movie.releaseDate).getFullYear()}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <IonIcon
                name="time-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[styles.metaText, { color: theme.colors.textSecondary }]}
              >
                {formatRuntime(movie.runtime)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <IonIcon
                name="film-outline"
                size={16}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[styles.metaText, { color: theme.colors.textSecondary }]}
              >
                HD
              </Text>
            </View>
          </View>

          {/* Language & Subtitles */}
          <View style={styles.languageContainer}>
            <View style={styles.languageItem}>
              <IonIcon
                name="volume-high-outline"
                size={18}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.languageText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                English | Vietnamese
              </Text>
            </View>
            <View style={styles.languageItem}>
              <IonIcon
                name="text-outline"
                size={18}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.languageText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                EN
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              playMovie(movie._id, movie.downloadLink, movie.title)
            }
          >
            <IonIcon name="play" size={24} color="#000" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <IonIcon name="add" size={24} color={theme.colors.text} />
            <Text
              style={[styles.actionButtonText, { color: theme.colors.text }]}
            >
              My List
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <IonIcon
              name="download-outline"
              size={24}
              color={theme.colors.text}
            />
            <Text
              style={[styles.actionButtonText, { color: theme.colors.text }]}
            >
              Download
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <View style={styles.detailsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Overview
          </Text>
          <Text
            style={[styles.overview, { color: theme.colors.textSecondary }]}
          >
            {movie.overview}
          </Text>

          {/* Genres */}
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, marginTop: 20 },
            ]}
          >
            Genres
          </Text>
          <View style={styles.genresContainer}>
            {movie.genres.map((genre, index) => (
              <View
                key={index}
                style={[
                  styles.genreChip,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <Text style={[styles.genreText, { color: theme.colors.text }]}>
                  {genre}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Similar Movies */}
        <View style={styles.similarMovieTextContainer}>
          <Text style={[styles.similarMovieText, { color: theme.colors.text }]}>
            More Like This
          </Text>
        </View>
        <SimilarMovies similarMoviesList={similarMoviesList} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 15,
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
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  posterContainer: {
    width: width,
    height: width * 1.5,
    position: 'relative',
  },
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  floatingBackButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieDetailsContainer: {
    paddingHorizontal: 20,
    marginTop: -40,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 14,
    marginLeft: 6,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  playButton: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overview: {
    fontSize: 15,
    lineHeight: 24,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '500',
  },
  similarMovieTextContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  similarMovieText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
