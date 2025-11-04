import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { mylistAPI } from '../api/mylistAPI'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import React from 'react'

export default function MylistMovies({ mylist, label }) {
    const [moviesList, setMoviesList] = React.useState([]);
    const navigation = useNavigation();

    const handleMovieDetails = (movie) => {
        navigation.navigate('MovieDetails', { movie })
    }

    React.useEffect(() => {
        const fetchMyListMovies = async () => {
            const movies = await mylistAPI();
            setMoviesList(movies.moviesInMyList);
        };
        fetchMyListMovies();
    }, [mylist]);

    const renderMovieCards = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieDetails(item)} style={styles.movieCardContainer}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item.posterPath}` }} style={styles.moviecardImage} />
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <FlatList data={moviesList} keyExtractor={(item) => item._id} renderItem={renderMovieCards} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 250,
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
        borderRadius: 20,
    },
    moviecardImage: {
        width: 150,
        height: '100%',
        borderRadius: 10
    }
});