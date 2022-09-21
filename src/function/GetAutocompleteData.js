import axios from "axios";

let lastCallTime = 0;

async function GetAutocompleteData(value, setOptions, targetPath) {
    if (value === "") {
        return;
    }
    const now = Date.now();
    if (now - lastCallTime < 400) {
        return;
    }
    lastCallTime = now;
    try {
        const response = await axios.get(`${targetPath}${value}`);
        setOptions(response.data);
    }
    catch (error) {
        console.log(error);
    }
}

export default GetAutocompleteData;