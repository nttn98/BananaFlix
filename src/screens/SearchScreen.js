import {
  View,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { moviesListAPI } from '../api/movieList';
import { movieSearchAPI } from '../api/MovieSearchAPI';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SearchMovieList from '../components/SearchMovieList';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [moviesList, setMoviesList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const movieListAPICall = async () => {
      const movies = await moviesListAPI();
      setMoviesList(movies);
    };

    movieListAPICall();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  //console.log("Search movie list are", moviesList);

  const handleSearch = async text => {
    setSearchText(text);
    setIsSearching(text.length > 0);

    if (text.length > 2) {
      const results = await movieSearchAPI(text);
      setSearchResult(results);
      console.log('Search Results', searchResult);
    } else {
      setSearchResult([]);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResult([]);
    setIsSearching(false);
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
        colors={
          theme.mode === 'dark'
            ? ['rgba(0,0,0,0.95)', 'rgba(0,0,0,0.8)', 'transparent']
            : ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.8)', 'transparent']
        }
        style={styles.header}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Search
        </Text>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <IonIcon
            name="search-outline"
            size={22}
            color={theme.colors.textSecondary}
            style={styles.searchIconLeft}
          />
          <TextInput
            placeholder="Search movies, shows..."
            placeholderTextColor={theme.colors.textSecondary}
            style={[styles.searchInput, { color: theme.colors.text }]}
            onChangeText={handleSearch}
            value={searchText}
            autoCorrect={false}
          />
          {isSearching && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <IonIcon
                name="close-circle"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {searchResult.length > 0 ? (
          <View>
            <Text style={[styles.resultsLabel, { color: theme.colors.text }]}>
              {searchResult.length} Results Found
            </Text>
            <SearchMovieList data={searchResult} />
          </View>
        ) : searchText.length > 0 ? (
          <View style={styles.emptyContainer}>
            <IonIcon
              name="film-outline"
              size={80}
              color={theme.colors.border}
            />
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>
              No movies found
            </Text>
            <Text
              style={[
                styles.emptySubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              Try searching with different keywords
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.allMoviesLabel, { color: theme.colors.text }]}>
              Popular Movies
            </Text>
            <SearchMovieList data={moviesList} />
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIconLeft: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  resultsLabel: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  allMoviesLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
});
