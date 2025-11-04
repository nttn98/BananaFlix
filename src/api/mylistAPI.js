import { ip } from "./ip";


export const addMovieToList = async (movieID) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    url = `${ip}/add-to-mylist/${movieID}`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}

export const removeMovieFromList = async (movieID) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    url = `${ip}/remove-from-mylist/${movieID}`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}

export const mylistAPI = async (movieID) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
    url = `${ip}/mylist`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}



