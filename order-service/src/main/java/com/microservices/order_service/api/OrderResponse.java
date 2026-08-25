package com.microservices.order_service.api;

import com.microservices.order_service.domain.Order;
import com.microservices.order_service.domain.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record OrderResponse(
        UUID id,
        String customerName,
        String item,
        Integer quantity,
        BigDecimal amount,
        OrderStatus status,
        Instant createdAt
) {
    public static OrderResponse from(Order order){
        return new OrderResponse(
                order.getId(),
                order.getCustomerName(),
                order.getItem(),
                order.getQuantity(),
                order.getAmount(),
                order.getStatus(),
                order.getCreatedAt()
        );
    }
}
