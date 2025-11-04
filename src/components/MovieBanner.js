import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { addMovieToList, removeMovieFromList } from '../api/mylistAPI';

export default function MovieBanner({
  moviesList,
  mylist,
  handleBanner,
  posterPlayButton,
  posterInfoButton,
}) {
  const [userMyList, setUserMyList] = React.useState(mylist);
  const navigation = useNavigation();

  const addToList = async item => {
    try {
      let response;
      if (userMyList.includes(item._id)) {
        response = await removeMovieFromList(item._id);
      } else {
        response = await addMovieToList(item._id);
      }
      console.log('User current mylist', response.user.mylist);
      setUserMyList(response.user.mylist);
      navigation.navigate('HomeScreen', { mylist: response.user.mylist });
    } catch (error) {
      console.log('Error adding/removing from list', error);
    }
  };

  const renderMovieBanner = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.posterPath}`,
        }}
        style={styles.posterImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={styles.linearGradient}
        >
          {/* My List button */}
          <TouchableOpacity
            style={styles.myListButton}
            onPress={() => addToList(item)}
          >
            {userMyList.includes(item._id) ? (
              <IonIcon name="checkmark-circle" size={30} color="white" />
            ) : (
              <IonIcon name="add-circle-outline" size={30} color="white" />
            )}
            <Text style={styles.myListText}>My List</Text>
          </TouchableOpacity>

          {/* Play button */}
          <TouchableOpacity
            style={styles.posterPlayButton}
            onPress={() =>
              posterPlayButton(item._id, item.downloadLink, item.title)
            }
          >
            <IonIcon name="play" size={28} color="black" />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>

          {/* Info button */}
          <TouchableOpacity
            style={styles.posterInfoButton}
            onPress={() => posterInfoButton(item)}
          >
            <IonIcon
              name="information-circle-outline"
              size={30}
              color="white"
            />
            <Text style={styles.infoText}>Info</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        data={moviesList}
        keyExtractor={item => item._id}
        renderItem={renderMovieBanner}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(70),
    width: '100%',
  },
  posterImage: {
    width: responsiveWidth(100),
    height: '100%',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  myListButton: {
    alignItems: 'center',
  },
  posterPlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: responsiveWidth(2),
    backgroundColor: 'white',
    width: responsiveWidth(25),
    justifyContent: 'center',
  },
  posterInfoButton: {
    alignItems: 'center',
  },
  myListText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginTop: responsiveHeight(0.5),
  },
  playText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(1.5),
  },
  infoText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginTop: responsiveHeight(0.5),
  },
});
