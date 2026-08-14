package com.lufthansa.disruption.repository;

import com.lufthansa.disruption.model.RebookingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RebookingOptionRepository extends JpaRepository<RebookingOption, Long> {

    List<RebookingOption> findByTripCaseIdOrderByAiRecommendedDescSeatsAvailableDesc(Long tripCaseId);
}
