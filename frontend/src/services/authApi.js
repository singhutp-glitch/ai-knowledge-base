import { getAuthToken } from "../auth/authSession";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export async function registerUser(name,email,password){
    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }
    );
    const data = await response.json();
    return data;
}

export async function loginUser(email,password){
    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
    const data = await response.json();
    return data;
}

export async function getUser(){
    const token = getAuthToken();
    const result = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/json",
                Authorization:`Bearer ${token}`    
            },
        }
    );
    const user = await result.json()
    return user;
    
}

export async function loginDemo() {
    const response = await fetch(
        `${API_BASE_URL}/auth/demo`,
        {
            method: "POST",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to start demo"
        );
    }

    return data;
}