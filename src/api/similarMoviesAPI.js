import { ip } from "./ip";


export const similarMoviesAPI = async (movieID) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    };

    url = `${ip}/getSimilarMovies/${movieID}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the similarsearch api", error);
    }
};