package com.lufthansa.disruption.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RebookingOptionDto(
        Long id,
        String title,
        String optionType,
        String flightNumber,
        String originCode,
        String destinationCode,
        String viaCode,
        LocalDateTime departureTime,
        LocalDateTime arrivalTime,
        String duration,
        boolean directFlight,
        String cabinClass,
        BigDecimal priceDifference,
        int seatsAvailable,
        String tag,
        String connectionQuality,
        boolean aiRecommended
) {}
