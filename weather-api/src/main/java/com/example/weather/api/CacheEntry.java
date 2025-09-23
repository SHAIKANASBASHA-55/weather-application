package com.example.weather.api;

import com.example.weather.api.model.CityWeatherData;

import java.util.List;

public class CacheEntry {

    private long timestamp;
    private List<CityWeatherData> weatherData;

    public CacheEntry(long timestamp, List<CityWeatherData> weatherData) {
        this.timestamp = timestamp;
        this.weatherData = weatherData;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public List<CityWeatherData> getWeatherData() {
        return weatherData;
    }

    public void setWeatherData(List<CityWeatherData> weatherData) {
        this.weatherData = weatherData;
    }
}
