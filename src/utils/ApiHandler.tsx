import axios from "axios";

const setHeaders = (token: string | undefined) => {
    let headers: { [key: string]: string } = {};
    headers["Content-Type"] = "application/json";
    if (token) {
        headers["Authorization"] = token;
    }
    return headers;
};

export const POST = async (endpoint: string, body: any, token: string | undefined) => {
    let headers = setHeaders(token);
    try {
        let { data } = await axios.post(endpoint, body, { headers });
        if (data) return data;
    } catch (e) {
        console.log(e);
    }
};

export const PUT = async (endpoint: string, body: any, token: string | undefined) => {
    let headers = setHeaders(token);
    try {
        let { data } = await axios.put(endpoint, body, { headers });
        if (data) return data;
    } catch (e) {
        console.log(e);
    }
};

export const GET = async (endpoint: string, token: string | undefined) => {
    let headers = setHeaders(token);
    try {
        let { data } = await axios.get(endpoint, { headers });
        if (data) return data;
    } catch (e) {
        console.log(e);
    }
};

export const DELETE = async (endpoint: string, body: any, token: string | undefined) => {
    let headers = setHeaders(token);
    try {
        let { data } = await axios.delete(endpoint, { headers, data: body });
        if (data) return data;
    } catch (e) {
        console.log(e);
    }
};