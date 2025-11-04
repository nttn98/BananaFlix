import { ip } from "./ip";


export const movieSearchAPI = async (movieName) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    const url = `${ip}/searchMovies/${movieName}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log("The data", data);
        return data;
    } catch (error) {
        console.error("Error fetching the moviesearch api", error);
    }
};