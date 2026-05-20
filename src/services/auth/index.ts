"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { apiFetch } from "@/lib/api";

type DecodedToken = {
  id: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  iat: number;
  exp: number;
};

export const loginUser = async (userData: FieldValues   ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });     
        if (!response.ok) {
            throw new Error('Login failed');
        }       
        const data = await response.json();
        const storeCookie = await cookies();
        if(data.success) {
            storeCookie.set('token', data?.data?.token);
        }
        return data; // Assuming the response contains user data and token
    }

    catch (error) {         
        console.error('Error logging in:', error);
        throw error;
    }  
}; 

export const   getUser = async () => {
    const storeCookie = await cookies();
    const token = storeCookie.get('token')?.value;
    let decodeData = null;
    if(token) {
        decodeData= jwtDecode<DecodedToken>(token);
        return decodeData;
    }else {
        return null;
    }
}

export const getMe = async () => {
    try {
        const response = await apiFetch("/api/auth/me");
        if (!response.ok) return null;
        const data = await response.json();
        return data?.data ?? null;
    } catch {
        return null;
    }
};

export const logoutUser = async () => {
    const storeCookie = await cookies();
    storeCookie.delete('token');
}

export const registerUser = async (userData: FieldValues) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const data = await response.json();
        const storeCookie = await cookies();
        if(data.success) {
            storeCookie.set('token', data?.data?.token);
        }
        return data;
    }
    catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}
