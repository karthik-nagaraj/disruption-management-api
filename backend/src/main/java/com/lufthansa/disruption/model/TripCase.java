package com.lufthansa.disruption.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trip_cases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String pnr;

    @Column(nullable = false)
    private String originAirport;

    @Column(nullable = false)
    private String destinationAirport;

    @Column
    private String viaAirport;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisruptionStatus status;

    @Column(length = 100)
    private String disruptionReason;

    @Column(nullable = false)
    private int progressPercent;

    @Column(nullable = false)
    private int passengerCount;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "tripCase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "tripCase", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Passenger> passengers = new ArrayList<>();

    @PrePersist
    void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
