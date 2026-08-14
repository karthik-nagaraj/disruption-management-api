package com.lufthansa.disruption.service;

import com.lufthansa.disruption.dto.RebookingOptionDto;
import com.lufthansa.disruption.exception.ResourceNotFoundException;
import com.lufthansa.disruption.model.TripCase;
import com.lufthansa.disruption.repository.RebookingOptionRepository;
import com.lufthansa.disruption.repository.TripCaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RebookingService {

    private final RebookingOptionRepository rebookingOptionRepository;
    private final TripCaseRepository tripCaseRepository;

    public List<RebookingOptionDto> getOptions(String pnr) {
        TripCase tc = tripCaseRepository.findByPnrIgnoreCase(pnr)
                .orElseThrow(() -> new ResourceNotFoundException("Trip case not found for PNR: " + pnr));

        return rebookingOptionRepository
                .findByTripCaseIdOrderByAiRecommendedDescSeatsAvailableDesc(tc.getId())
                .stream()
                .map(o -> new RebookingOptionDto(
                        o.getId(), o.getTitle(), o.getOptionType(), o.getFlightNumber(),
                        o.getOriginCode(), o.getDestinationCode(), o.getViaCode(),
                        o.getDepartureTime(), o.getArrivalTime(), o.getDuration(),
                        o.isDirectFlight(), o.getCabinClass(), o.getPriceDifference(),
                        o.getSeatsAvailable(), o.getTag(), o.getConnectionQuality(), o.isAiRecommended()))
                .toList();
    }
}
