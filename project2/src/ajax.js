function downloadFile(url, callbackRef) {
    const xhr = new XMLHttpRequest();
    // 1. set 'onerror' handler
    xhr.onerror = (e) => console.log("error");

    // 2. set 'onload' handler
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        callbackRef(jsonString);
    };

    // 3. open the connection using HTTP GET method
    xhr.open("GET", url);

    // 4. request headers if wanted
    //https:developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestHeaders

    // 5. send request
    xhr.send();
}

export { downloadFile }