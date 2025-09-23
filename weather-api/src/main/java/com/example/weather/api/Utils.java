package com.example.weather.api;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class Utils {

    // Converts UTC timestamp + timezone offset (in seconds) to readable time + date
    public static String convertTimestampToReadableDate(long utcTimestamp, int timezoneOffsetSeconds) {
        // Convert seconds to milliseconds and add timezone offset
        long localMillis = (utcTimestamp + timezoneOffsetSeconds) * 1000L;

        SimpleDateFormat timeFormatter = new SimpleDateFormat("h:mm a"); // 12-hour format
        SimpleDateFormat dateFormatter = new SimpleDateFormat("MMM dd");  // e.g., Sep 19

        // Set timezone to UTC (because we already added offset manually)
        timeFormatter.setTimeZone(TimeZone.getTimeZone("UTC"));
        dateFormatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        String formattedTime = timeFormatter.format(localMillis);
        String formattedDate = dateFormatter.format(localMillis);

        return formattedTime + ", " + formattedDate;
    }

    // Convert UTC timestamp + timezone offset to time only (for sunrise/sunset)
    public static String convertTimestampToTime(long utcTimestamp, int timezoneOffsetSeconds) {
        long localMillis = (utcTimestamp + timezoneOffsetSeconds) * 1000L;

        SimpleDateFormat timeFormatter = new SimpleDateFormat("h:mm a");
        timeFormatter.setTimeZone(TimeZone.getTimeZone("UTC"));

        return timeFormatter.format(localMillis);
    }
}
