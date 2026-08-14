package com.lufthansa.disruption.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String flightNumber;

    @Column(nullable = false, length = 3)
    private String originCode;

    @Column(nullable = false, length = 3)
    private String destinationCode;

    @Column(nullable = false)
    private LocalDateTime scheduledDeparture;

    @Column(nullable = false)
    private LocalDateTime scheduledArrival;

    @Column
    private LocalDateTime actualDeparture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisruptionStatus status;

    @Column(length = 20)
    private String cabinClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_case_id", nullable = false)
    private TripCase tripCase;
}
