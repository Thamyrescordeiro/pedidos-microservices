package com.microservices.order_service.messaging;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record OrderCreatedEvent(
        UUID orderId,
        String customerName,
        String item,
        Integer quantity,
        BigDecimal amount,
        Instant createdAt
        ) {


}
