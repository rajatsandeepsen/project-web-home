// axios-request.js

import axios from "axios";
// Function to make Axios GET request
const makeGetRequest = async () => {
  const url = "https://newsdata.io/api/1/news";
  const apiKey = "pub_4917465ad804d2e4471f179d79d2a08e9af28";
  const language = "en";
  const category = "technology";

  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
        language,
        category,
      },
    });

    // console.log(response.data.results);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for handling in caller
  }
};

// Export the function to be able to call it from another script
export { makeGetRequest };
