package com.example.reservationservice;

import io.micrometer.core.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
public class ReservationController {

    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Timed(value = "reservation.reserve", description = "Time taken to reserve")
    @PostMapping("/reserve")
    public ResponseEntity<Map<String, Object>> reserve(
            @RequestHeader(value = "Content-Type", required = false) String contentType,
            @RequestHeader(value = "X-MESSAGE-ID") String messageId,
            @RequestBody Map<String, Object> reservation) {

        logger.info("Received reservation request with X-MESSAGE-ID: {}", messageId);

        if (!"application/json".equals(contentType)) {
            logger.warn("Invalid Content-Type: {}", contentType);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Invalid Content-Type"));
        }

        // Generate a new UUID for the signature
        String signature = UUID.randomUUID().toString();

        // Create the response map
        Map<String, Object> response = Map.of(
                "reservation", Map.of(
                        "X-MESSAGE-ID", messageId,
                        "signature", signature
                )
        );

        // Set the Content-Type header in the response
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        logger.debug("Reservation response: {}", response);

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @Timed(value = "reservation.cancel", description = "Time taken to cancel reservation")
    @GetMapping("/cancelreserve")
    public ResponseEntity<Map<String, Object>> cancelReserve(
            @RequestHeader(value = "X-MESSAGE-ID") String messageId) {

        logger.info("Received cancel reservation request with X-MESSAGE-ID: {}", messageId);

        // Generate a new UUID for the signature
        String signature = UUID.randomUUID().toString();

        // Create the response map
        Map<String, Object> response = Map.of(
                "cancelreservation", Map.of(
                        "X-MESSAGE-ID", messageId,
                        "signature", signature
                )
        );

        // Set the Content-Type header in the response
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        logger.debug("Cancel reservation success: {}", response);

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }
}
