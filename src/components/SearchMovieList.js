import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

export default function SearchMovieList({ data }) {
    const navigation = useNavigation();
    const formatReleaseDate = (dateString) => {
        const year = new Date(dateString).getFullYear();

        return year.toString();
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes} min`;
    };

    const handleMoviePress = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    };

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => handleMoviePress(item)}>
                <View style={styles.movieContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/original/${item.posterPath}` }} style={styles.posterImage} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>{item.title} ({formatReleaseDate(item.releaseDate)})</Text>
                        <View style={styles.genreContainer}>
                            {item.genres.map((genre, index) => (
                                <View key={index} style={styles.genreItem}>
                                    <Text style={styles.movieGenres}>{genre}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.movieTitle}>{formatRuntime(item.runtime)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={styles.flatList}
            scrollEnabled={false}
        />
    );
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'black',
    },
    movieContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },

    posterImage: {
        width: 80,
        height: 120,
        marginRight: 10,
    },

    movieInfo: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    movieTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    genreContainer: {
        flexDirection: 'row',
    },

    genreItem: {
        backgroundColor: '#202124',
        borderRadius: 10, // Adjust the border radius
        marginRight: 5,
        paddingVertical: 3,
        paddingHorizontal: 8,
    },

    movieGenres: {
        fontWeight: 'bold',
        color: 'white',
    },

})