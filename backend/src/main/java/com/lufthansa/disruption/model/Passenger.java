package com.lufthansa.disruption.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "passengers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Passenger {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, length = 10)
    private String type;

    @Column(length = 20)
    private String frequentFlyerNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_case_id", nullable = false)
    private TripCase tripCase;
}
