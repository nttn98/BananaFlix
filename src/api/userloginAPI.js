import { ip } from "./ip";
export const userloginAPI = async (username, password) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }
    url = `${ip}/login`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}



export const checkAuthAPI = async (username, password) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }

    url = `${ip}/check-auth`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}


export const userLogout = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }
    url = `${ip}/logout`
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching the api", error);
    }
}