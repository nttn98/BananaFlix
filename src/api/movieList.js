import { ip } from "./ip";

export const moviesListAPI = async (genreID) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    let url = ip;
    if (genreID) {
        url = `${ip}/getMovies/${genreID}`;
    } else {
        url = `${ip}/getMovies`;
    }

    try {
        const response = await fetch(url, options);
        const data = response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the movie list API", error);
    }
};
