package com.example.weather.api;

import com.example.weather.api.model.CityData;
import com.example.weather.api.model.ListResponse;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
public class CityDataParser {

    private CityData[] cityDataList; // Array to store city data
    private String[] cityIds; // Array to store city IDs

    // Constructor to initialize city data and city IDs
    public CityDataParser() {
        Gson gson = new Gson();
        String jsonPath = "cities.json"; // Path to the JSON file containing city data
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(jsonPath)){
            if (inputStream != null) {
                // Read the JSON file and convert it to a string
                String citiesJsonString = new String(inputStream.readAllBytes());
                // Deserialize JSON string to ListResponse object using Gson
                ListResponse listResponse = gson.fromJson(citiesJsonString, ListResponse.class);
                // Extract city data array from ListResponse
                cityDataList = listResponse.getList();
                // Initialize cityIds array with the length of cityDataList
                cityIds = new String[cityDataList.length];
                int index = 0;
                // Populate cityIds array with city codes from cityDataList
                for (CityData cityData : cityDataList) {
                    cityIds[index++] = cityData.getCityCode();
                }
            }
        } catch (IOException e) {
            // Handle IOException, if any
            // This block can be used for logging or error handling
        }
    }

    // Method to get the array of city data
    public CityData[] getCityDataList() {
        return cityDataList;
    }

    // Method to get the array of city IDs
    public String[] getCityIds() {
        return cityIds;
    }
}