package com.lufthansa.disruption.repository;

import com.lufthansa.disruption.model.TripCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TripCaseRepository extends JpaRepository<TripCase, Long> {

    Optional<TripCase> findByPnrIgnoreCase(String pnr);

    @Query("SELECT t FROM TripCase t LEFT JOIN FETCH t.flights LEFT JOIN FETCH t.passengers WHERE UPPER(t.pnr) = UPPER(:pnr)")
    Optional<TripCase> findByPnrWithDetails(String pnr);
}
