import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { moviesListAPI } from '../api/movieList';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

export default function MovieCards({ genreID, label }) {
  const [moviesList, setMoviesList] = React.useState([]);
  const navigation = useNavigation();

  const handleMovieDetails = movie => {
    navigation.navigate('MovieDetails', { movie });
  };

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movies = await moviesListAPI(genreID);
      setMoviesList(movies);
    };
    fetchMovies();
  }, [genreID]);

  //console.log(`Movies from the genre ${genreID} is ${moviesList}`);

  const MovieCard = ({ item }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        onPress={() => handleMovieDetails(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.movieCardContainer}
      >
        <Animated.View
          style={[styles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.posterPath}`,
            }}
            style={styles.moviecardImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardGradient}
          >
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderMovieCards = ({ item }) => <MovieCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList
        data={moviesList.slice(0, 10)}
        keyExtractor={item => item._id}
        renderItem={renderMovieCards}
        windowSize={2}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 280,
  },
  label: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
  movieCardContainer: {
    marginRight: 10,
    marginBottom: 20,
  },
  cardWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  moviecardImage: {
    width: 150,
    height: 240,
    borderRadius: 10,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'flex-end',
  },
  movieTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});
