package com.lufthansa.disruption.config;

import com.lufthansa.disruption.model.*;
import com.lufthansa.disruption.repository.RebookingOptionRepository;
import com.lufthansa.disruption.repository.TripCaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final TripCaseRepository tripCaseRepository;
    private final RebookingOptionRepository rebookingOptionRepository;

    @Override
    public void run(String... args) {
        if (tripCaseRepository.count() > 0) return;

        LocalDateTime base = LocalDateTime.now().withHour(14).withMinute(0);

        // Trip Case 1 — ABCD12 (the showcase demo case from screenshot)
        TripCase tc1 = TripCase.builder()
                .pnr("ABCD12")
                .originAirport("FRA")
                .destinationAirport("LAX")
                .viaAirport("JFK")
                .status(DisruptionStatus.DISRUPTED)
                .disruptionReason("Cancelled (Technical)")
                .progressPercent(75)
                .passengerCount(2)
                .build();

        Flight f1 = Flight.builder()
                .flightNumber("LH 456")
                .originCode("FRA")
                .destinationCode("JFK")
                .scheduledDeparture(base.plusHours(2))
                .scheduledArrival(base.plusHours(11))
                .status(DisruptionStatus.CANCELLED)
                .cabinClass("Economy")
                .tripCase(tc1)
                .build();

        Flight f2 = Flight.builder()
                .flightNumber("UA 102")
                .originCode("JFK")
                .destinationCode("LAX")
                .scheduledDeparture(base.plusHours(14))
                .scheduledArrival(base.plusHours(20))
                .status(DisruptionStatus.ON_HOLD)
                .cabinClass("Economy")
                .tripCase(tc1)
                .build();

        tc1.getFlights().add(f1);
        tc1.getFlights().add(f2);

        Passenger p1 = Passenger.builder().firstName("Maria").lastName("H.").type("ADT").tripCase(tc1).build();
        Passenger p2 = Passenger.builder().firstName("Klaus").lastName("M.").type("ADT").tripCase(tc1).build();
        tc1.getPassengers().add(p1);
        tc1.getPassengers().add(p2);

        tripCaseRepository.save(tc1);

        // Rebooking options for ABCD12
        RebookingOption opt1 = RebookingOption.builder()
                .title("Same-Day Direct")
                .optionType("SAME_DAY_DIRECT")
                .flightNumber("LH 400")
                .originCode("FRA").destinationCode("JFK")
                .departureTime(base.plusHours(2).withMinute(25))
                .arrivalTime(base.plusHours(8).withMinute(55))
                .duration("8h 30m")
                .directFlight(true)
                .cabinClass("Economy")
                .priceDifference(BigDecimal.ZERO)
                .seatsAvailable(8)
                .tag("BEST_OPTION")
                .aiRecommended(true)
                .tripCase(tc1)
                .build();

        RebookingOption opt2 = RebookingOption.builder()
                .title("Business Upgrade")
                .optionType("BUSINESS_UPGRADE")
                .flightNumber("LH 400")
                .originCode("FRA").destinationCode("JFK")
                .departureTime(base.plusHours(1).withMinute(20))
                .arrivalTime(base.plusHours(6).withMinute(50))
                .duration("8h 30m")
                .directFlight(true)
                .cabinClass("Business")
                .priceDifference(new BigDecimal("1340"))
                .seatsAvailable(5)
                .tag("RECOMMENDED")
                .aiRecommended(false)
                .tripCase(tc1)
                .build();

        RebookingOption opt3 = RebookingOption.builder()
                .title("Via Vienna")
                .optionType("VIA_CITY")
                .flightNumber("LH 1235")
                .originCode("FRA").destinationCode("JFK").viaCode("VIE")
                .departureTime(base.withMinute(30))
                .arrivalTime(base.plusHours(8).withMinute(10))
                .duration("13h 40m")
                .directFlight(false)
                .cabinClass("Economy")
                .priceDifference(BigDecimal.ZERO)
                .seatsAvailable(12)
                .connectionQuality("Good connection")
                .aiRecommended(false)
                .tripCase(tc1)
                .build();

        RebookingOption opt4 = RebookingOption.builder()
                .title("Via Zürich")
                .optionType("VIA_CITY")
                .flightNumber("LH 1186")
                .originCode("FRA").destinationCode("JFK").viaCode("ZRH")
                .departureTime(base.plusHours(1).withMinute(45))
                .arrivalTime(base.plusHours(9).withMinute(15))
                .duration("13h 30m")
                .directFlight(false)
                .cabinClass("Economy")
                .priceDifference(BigDecimal.ZERO)
                .seatsAvailable(6)
                .connectionQuality("Good connection")
                .aiRecommended(false)
                .tripCase(tc1)
                .build();

        rebookingOptionRepository.save(opt1);
        rebookingOptionRepository.save(opt2);
        rebookingOptionRepository.save(opt3);
        rebookingOptionRepository.save(opt4);

        // Trip Case 2 — EFGH34
        TripCase tc2 = TripCase.builder()
                .pnr("EFGH34")
                .originAirport("MUC")
                .destinationAirport("JFK")
                .status(DisruptionStatus.DELAYED)
                .disruptionReason("Delayed (Weather)")
                .progressPercent(40)
                .passengerCount(1)
                .build();

        Flight f3 = Flight.builder()
                .flightNumber("LH 410")
                .originCode("MUC").destinationCode("JFK")
                .scheduledDeparture(base.plusHours(3))
                .scheduledArrival(base.plusHours(12))
                .status(DisruptionStatus.DELAYED)
                .cabinClass("Economy")
                .tripCase(tc2)
                .build();

        tc2.getFlights().add(f3);
        tc2.getPassengers().add(Passenger.builder().firstName("Hans").lastName("B.").type("ADT").tripCase(tc2).build());
        tripCaseRepository.save(tc2);

        log.info("Demo data loaded: 2 trip cases, 4 rebooking options");
    }
}
