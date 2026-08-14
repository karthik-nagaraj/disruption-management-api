package com.lufthansa.disruption.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rebooking_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RebookingOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 30)
    private String optionType;

    @Column(nullable = false, length = 10)
    private String flightNumber;

    @Column(nullable = false, length = 3)
    private String originCode;

    @Column(nullable = false, length = 3)
    private String destinationCode;

    @Column(length = 3)
    private String viaCode;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private boolean directFlight;

    @Column(nullable = false, length = 20)
    private String cabinClass;

    @Column(precision = 10, scale = 2)
    private BigDecimal priceDifference;

    @Column(nullable = false)
    private int seatsAvailable;

    @Column(length = 20)
    private String tag;

    @Column(length = 30)
    private String connectionQuality;

    @Column(nullable = false)
    private boolean aiRecommended;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_case_id", nullable = false)
    private TripCase tripCase;
}
