package com.lufthansa.disruption.controller;

import com.lufthansa.disruption.dto.TripCaseDto;
import com.lufthansa.disruption.service.TripCaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-cases")
@RequiredArgsConstructor
public class TripCaseController {

    private final TripCaseService tripCaseService;

    @GetMapping
    public ResponseEntity<List<TripCaseDto>> getAll() {
        return ResponseEntity.ok(tripCaseService.getAll());
    }

    @GetMapping("/{pnr}")
    public ResponseEntity<TripCaseDto> getByPnr(@PathVariable String pnr) {
        return ResponseEntity.ok(tripCaseService.getByPnr(pnr));
    }
}
