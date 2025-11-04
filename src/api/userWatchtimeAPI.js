import { ip } from "./ip";


export const updateWatchtime = async (watchedTime, movieID) => {
    // Update the watchtime of a single movie in the user list
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ watchedTime }),
    };

    url = `${ip}/update-watched-time/${movieID}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};


export const getAllWatchTimes = async () => {
    // Get watchtime of all the movies in the user list
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    };

    url = `${ip}/watched-movies`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const getWatchtime = async (movieID) => {
    // Get watchtime of a single movie in the user list
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    };

    url = `${ip}/watched-time/${movieID}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};

export const removeWatchedMovie = async (movieID) => {
    // Update the watchtime of a single movie in the user list
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieID }),
    };

    url = `${ip}/remove-watched-movie/${movieID}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
};