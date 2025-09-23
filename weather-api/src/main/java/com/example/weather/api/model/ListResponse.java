package com.example.weather.api.model;

public class ListResponse {

    private CityData[] List;

    public CityData[] getList() {
        return List;
    }

    public void setList(CityData[] list) {
        List = list;
    }
}
