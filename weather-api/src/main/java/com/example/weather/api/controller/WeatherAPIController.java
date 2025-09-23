package com.example.weather.api.controller;

import com.example.weather.api.CacheEntry;
import com.example.weather.api.Utils;
import com.example.weather.api.model.CityWeatherData;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/weather")
public class WeatherAPIController {

    private final ConcurrentHashMap<String, CacheEntry> requestCache = new ConcurrentHashMap<>();

    @Value("${weather.appId}")
    private String appId; // Your OpenWeatherMap API key

    @GetMapping("/cities")
    public ResponseEntity<List<CityWeatherData>> getCitiesWeatherData(
            HttpServletRequest request,
            @RequestParam(value = "names", required = false) String names // user sends comma-separated city names
    ) {
        // Use the full URL including query to cache correctly
        String cacheKey = request.getRequestURL().toString() + "?" + request.getQueryString();

        // Return cached data if available and not expired (5 min)
        if (requestCache.containsKey(cacheKey)) {
            CacheEntry cacheEntry = requestCache.get(cacheKey);
            if ((System.currentTimeMillis() - cacheEntry.getTimestamp()) < 300_000) {
                return ResponseEntity.ok(cacheEntry.getWeatherData());
            }
        }

        if (names == null || names.isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<String> cityNames = Arrays.asList(names.split(","));
        WebClient client = WebClient.create("https://api.openweathermap.org");
        List<CityWeatherData> cityWeatherDataList = new ArrayList<>();

        for (String cityName : cityNames) {
            try {
                String response = client.get()
                        .uri("/data/2.5/weather?q={cityName}&units=metric&appid={appId}", cityName.trim(), appId)
                        .accept(MediaType.APPLICATION_JSON)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

                if (response != null && !response.isEmpty()) {
                    Gson gson = new Gson();
                    JsonObject jsonObject = gson.fromJson(response, JsonObject.class);

                    int timezoneOffset = jsonObject.get("timezone").getAsInt(); // in seconds

                    CityWeatherData cityWeatherData = new CityWeatherData();
                    cityWeatherData.setCityName(jsonObject.get("name").getAsString());
                    cityWeatherData.setCountry(jsonObject.get("sys").getAsJsonObject().get("country").getAsString());
                    cityWeatherData.setTemperature(jsonObject.get("main").getAsJsonObject().get("temp").getAsString());
                    cityWeatherData.setMinTemperature(jsonObject.get("main").getAsJsonObject().get("temp_min").getAsString());
                    cityWeatherData.setMaxTemperature(jsonObject.get("main").getAsJsonObject().get("temp_max").getAsString());
                    cityWeatherData.setPressure(jsonObject.get("main").getAsJsonObject().get("pressure").getAsString());
                    cityWeatherData.setHumidity(jsonObject.get("main").getAsJsonObject().get("humidity").getAsString());
                    cityWeatherData.setVisibility(jsonObject.get("visibility").getAsString());
                    cityWeatherData.setWind(
                            jsonObject.get("wind").getAsJsonObject().get("speed").getAsString() + " m/s"
                    );
                    cityWeatherData.setDescription(
                            jsonObject.get("weather").getAsJsonArray()
                                    .get(0).getAsJsonObject().get("description").getAsString()
                    );
                    cityWeatherData.setLastUpdatedTime(
                            Utils.convertTimestampToReadableDate(jsonObject.get("dt").getAsLong(), timezoneOffset)
                    );
                    cityWeatherData.setSunrise(
                            Utils.convertTimestampToTime(
                                    jsonObject.get("sys").getAsJsonObject().get("sunrise").getAsLong(),
                                    timezoneOffset
                            )
                    );
                    cityWeatherData.setSunset(
                            Utils.convertTimestampToTime(
                                    jsonObject.get("sys").getAsJsonObject().get("sunset").getAsLong(),
                                    timezoneOffset
                            )
                    );

                    cityWeatherDataList.add(cityWeatherData);
                }
            } catch (Exception e) {
                e.printStackTrace(); // log error, continue with other cities
            }
        }

        // Cache the response
        requestCache.put(cacheKey, new CacheEntry(System.currentTimeMillis(), cityWeatherDataList));

        return ResponseEntity.ok(cityWeatherDataList);
    }
}
