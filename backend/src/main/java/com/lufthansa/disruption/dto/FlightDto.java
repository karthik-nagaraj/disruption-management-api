package com.lufthansa.disruption.dto;

import com.lufthansa.disruption.model.DisruptionStatus;

import java.time.LocalDateTime;

public record FlightDto(
        Long id,
        String flightNumber,
        String originCode,
        String destinationCode,
        LocalDateTime scheduledDeparture,
        LocalDateTime scheduledArrival,
        DisruptionStatus status,
        String cabinClass
) {}
