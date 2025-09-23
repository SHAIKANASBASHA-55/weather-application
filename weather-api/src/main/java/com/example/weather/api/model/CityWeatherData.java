package com.example.weather.api.model;

public class CityWeatherData {
    private String cityId;
    private String cityName;
    private String country;
    private String lastUpdatedTime;
    private String description;
    private String temperature;
    private String minTemperature;
    private String maxTemperature;
    private String pressure;
    private String humidity;
    private String visibility;
    private String wind;
    private String sunrise;
    private String sunset;

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTemperature() { return temperature; }
    public void setTemperature(String temperature) { this.temperature = temperature; }

    public String getMinTemperature(){ return minTemperature; }
    public void setMinTemperature(String minTemperature){ this.minTemperature = minTemperature; }

    public String getMaxTemperature(){ return maxTemperature; }
    public void setMaxTemperature(String maxTemperature){ this.maxTemperature = maxTemperature; }

    public String getLastUpdatedTime() { return lastUpdatedTime; }
    public void setLastUpdatedTime(String lastUpdatedTime) { this.lastUpdatedTime = lastUpdatedTime; }

    public String getCityName() { return cityName; }
    public void setCityName(String cityName) { this.cityName = cityName; }

    public String getCityId() { return cityId; }
    public void setCityId(String cityId) { this.cityId = cityId; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPressure() { return pressure; }
    public void setPressure(String pressure) { this.pressure = pressure; }

    public String getHumidity() { return humidity; }
    public void setHumidity(String humidity) { this.humidity = humidity; }

    public String getVisibility() { return visibility; }
    public void setVisibility(String visibility) { this.visibility = visibility; }

    public String getWind() { return wind; }
    public void setWind(String wind) { this.wind = wind; }

    public String getSunrise() { return sunrise; }
    public void setSunrise(String sunrise) { this.sunrise = sunrise; }

    public String getSunset() { return sunset; }
    public void setSunset(String sunset) { this.sunset = sunset; }
}
