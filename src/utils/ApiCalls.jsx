import { globalVariables } from "./GlobalVariables";

const baseURL = globalVariables.BASE_URL;
// const baseURL = globalVariables.BASE_URL_2;
// const baseURL = globalVariables.BASE_URL_3;

// Post data
export async function postData(api_endpoint, data) {
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        method: globalVariables.METHOD_POST,
        headers: {
            Accept: globalVariables.ACCEPT,
            "Content-Type": globalVariables.CONTENT_TYPE,
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}


// Get data
export async function getData(api_endpoint) {
    const url = baseURL + api_endpoint;
    const response = await fetch(url);
    return await response.json();
}