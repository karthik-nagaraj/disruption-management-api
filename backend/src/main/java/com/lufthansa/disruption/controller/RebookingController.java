package com.lufthansa.disruption.controller;

import com.lufthansa.disruption.dto.RebookingOptionDto;
import com.lufthansa.disruption.service.RebookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-cases/{pnr}/rebooking-options")
@RequiredArgsConstructor
public class RebookingController {

    private final RebookingService rebookingService;

    @GetMapping
    public ResponseEntity<List<RebookingOptionDto>> getOptions(@PathVariable String pnr) {
        return ResponseEntity.ok(rebookingService.getOptions(pnr));
    }
}
