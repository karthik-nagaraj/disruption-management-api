package com.lufthansa.disruption.dto;

import com.lufthansa.disruption.model.DisruptionStatus;

import java.time.LocalDateTime;
import java.util.List;

public record TripCaseDto(
        Long id,
        String pnr,
        String originAirport,
        String destinationAirport,
        String viaAirport,
        DisruptionStatus status,
        String disruptionReason,
        int progressPercent,
        int passengerCount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<FlightDto> flights,
        List<PassengerDto> passengers
) {}
