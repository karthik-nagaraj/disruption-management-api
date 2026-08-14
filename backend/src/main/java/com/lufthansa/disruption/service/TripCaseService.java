package com.lufthansa.disruption.service;

import com.lufthansa.disruption.dto.*;
import com.lufthansa.disruption.exception.ResourceNotFoundException;
import com.lufthansa.disruption.model.TripCase;
import com.lufthansa.disruption.repository.TripCaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TripCaseService {

    private final TripCaseRepository tripCaseRepository;

    public TripCaseDto getByPnr(String pnr) {
        TripCase tc = tripCaseRepository.findByPnrWithDetails(pnr)
                .orElseThrow(() -> new ResourceNotFoundException("Trip case not found for PNR: " + pnr));
        return toDto(tc);
    }

    public List<TripCaseDto> getAll() {
        return tripCaseRepository.findAll().stream().map(this::toDto).toList();
    }

    private TripCaseDto toDto(TripCase tc) {
        List<FlightDto> flights = tc.getFlights().stream()
                .map(f -> new FlightDto(f.getId(), f.getFlightNumber(), f.getOriginCode(),
                        f.getDestinationCode(), f.getScheduledDeparture(), f.getScheduledArrival(),
                        f.getStatus(), f.getCabinClass()))
                .toList();

        List<PassengerDto> passengers = tc.getPassengers().stream()
                .map(p -> new PassengerDto(p.getId(), p.getFirstName(), p.getLastName(),
                        p.getType(), p.getFrequentFlyerNumber()))
                .toList();

        return new TripCaseDto(tc.getId(), tc.getPnr(), tc.getOriginAirport(), tc.getDestinationAirport(),
                tc.getViaAirport(), tc.getStatus(), tc.getDisruptionReason(), tc.getProgressPercent(),
                tc.getPassengerCount(), tc.getCreatedAt(), tc.getUpdatedAt(), flights, passengers);
    }
}
