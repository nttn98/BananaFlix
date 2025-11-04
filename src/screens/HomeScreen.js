import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React from 'react';
import { moviesListAPI } from '../api/movieList';
import MovieBanner from '../components/MovieBanner';
import MyListMovie from '../components/MyListMovie';
import MovieCards from '../components/MovieCards';
import { mylistAPI } from '../api/mylistAPI';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [moviesList, setMoviesList] = React.useState([]);
  const [mylist, setMylist] = React.useState(route.params.mylist);
  const [watchedMovies, setWatchedMovies] = React.useState(
    route.params.watchedMovies,
  );
  const scrollY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const moviesListAPICall = async () => {
      try {
        const movies = await moviesListAPI();
        // console.log('Fetched Movies List:', movies); // Check API response
        setMoviesList(movies);
      } catch (error) {
        console.error('Error fetching movies list:', error);
      }
    };
    moviesListAPICall();
  }, []);

  React.useEffect(() => {
    const updateMylist = async () => {
      // You may need to fetch the updated mylist from your API here
      const updatedMyList = await mylistAPI();
      setMylist(updatedMyList.moviesInMyList);
    };

    updateMylist();
  }, [route.params.mylist]);

  //console.log('Movie list', movieList)
  //console.log('My list', mylist)
  //console.log('Watched movies', watchedMovies)

  const handleBanner = movie => {
    console.log('Handle banner', movie);
  };

  const posterPlayButton = (movieID, movieLink, movieTitle) => {
    // console.log('Play button', movieID, movieLink, movieTitle)
    navigation.navigate('MoviesVideoPlayer', {
      movieID,
      movieLink,
      movieTitle,
    });
  };

  const posterInfoButton = movie => {
    // console.log('Info', movie);
    navigation.navigate('MovieDetails', { movie });
  };

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
            theme.mode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
            theme.mode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
            'transparent',
          ]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={[styles.headerLogo, { color: theme.colors.text }]}>
              🍌 BananaFlix
            </Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.headerIcon}>
                <IonIcon
                  name="search-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIcon}>
                <IonIcon
                  name="notifications-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <MovieBanner
          moviesList={moviesList}
          mylist={mylist}
          handleBanner={handleBanner}
          posterPlayButton={posterPlayButton}
          posterInfoButton={posterInfoButton}
        />
        <View style={styles.subContainer}>
          {mylist.length != 0 && (
            <MyListMovie label={'My List'} mylist={mylist} />
          )}
          <MovieCards genreID={12} label={'Action Movies'} />
          <MovieCards genreID={28} label={'Adventure Movies'} />
          <MovieCards genreID={35} label={'Comedy Movies'} />
          <MovieCards genreID={18} label={'Drama Movies'} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 10,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914',
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 20,
    paddingBottom: 30,
  },
});
