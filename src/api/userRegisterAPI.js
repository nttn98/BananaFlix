import { ip } from "./ip";

export const userRegisterAPI = async (firstName, lastName, age, gender, email, username, password) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            email: email,
            username: username,
            password: password,
        }),
    };

    const url = `${ip}/register`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching the userRegister api", error);
    }
}