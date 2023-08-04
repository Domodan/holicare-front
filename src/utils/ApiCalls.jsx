import { globalVariables } from "./GlobalVariables";

// const baseURL = globalVariables.BASE_URL;
const baseURL = globalVariables.BASE_URL_2;
// const baseURL = globalVariables.BASE_URL_3;

// Post data
export async function postData(api_endpoint, data) {
    let header = new Headers({
        Accept: globalVariables.ACCEPT,
        "Content-Type": globalVariables.CONTENT_TYPE,
    });
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        method: globalVariables.METHOD_POST,
        headers: header,
        body: JSON.stringify(data),
    });
    return await response.json();
}

// Post data with Token
export async function postDataToken(api_endpoint, data) {
    let header = new Headers({
        Accept: globalVariables.ACCEPT,
        "Content-Type": globalVariables.CONTENT_TYPE,
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    });
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        method: globalVariables.METHOD_POST,
        headers: header,
        body: JSON.stringify(data),
    });
    return await response.json();
}

// Post data with Tokens
export async function postDataTokens(api_endpoint, data) {
    let header = new Headers({
        Accept: globalVariables.ACCEPT,
        "Content-Type": globalVariables.CONTENT_TYPE,
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    });
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        method: globalVariables.METHOD_POST,
        headers: header,
        body: JSON.stringify(data),
    });

    console.log('====================================');
    console.log("Response:", response);
    console.log('====================================');

    // Check if the response status is in the 200-299 range
    if (!response.ok) {
        const errorData = {
            error: true,
            status: response.status,
            message: response.statusText, // Get the status text as the error message
        };
        return { data: null, errorData };
    }

    // If the response is successful, parse and return the JSON data
    const jsonData = await response.json();
    return { data: jsonData, errorData: null };
}


// Get data
export async function getData(api_endpoint) {
    const url = baseURL + api_endpoint;
    const response = await fetch(url);
    return await response.json();
}

// Get data with Access Tokens
export async function getDataTokens(api_endpoint) {
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        }
    });
    return await response.json();
}