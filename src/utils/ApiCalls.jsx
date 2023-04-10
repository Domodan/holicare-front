import { globalVariables } from "./GlobalVariables";

const baseURL = globalVariables.BASE_URL;
// const baseURL = globalVariables.BASE_URL_2;
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

// Post data with Tokens
export async function postDataToken(api_endpoint, data) {
    let header = new Headers({
        Accept: globalVariables.ACCEPT,
        "Content-Type": globalVariables.CONTENT_TYPE,
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
    });
    // header.append('Authorization', `Bearer ${localStorage.getItem("token")}`)
    const url = baseURL + api_endpoint;
    const response = await fetch(url, {
        method: globalVariables.METHOD_POST,
        headers: header,
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