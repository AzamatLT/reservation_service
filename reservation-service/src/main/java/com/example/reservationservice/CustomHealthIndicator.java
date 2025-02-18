package com.example.reservationservice;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        // Пример проверки здоровья
        boolean isHealthy = true; // Замените на реальную проверку
        if (isHealthy) {
            return Health.up().withDetail("Custom Health Check", "Up").build();
        } else {
            return Health.down().withDetail("Custom Health Check", "Down").build();
        }
    }
}
