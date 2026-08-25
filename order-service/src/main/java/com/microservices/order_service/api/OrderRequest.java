package com.microservices.order_service.api;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record OrderRequest(

        @NotBlank String customerName,
        @NotBlank String item,
        @NotNull @Positive Integer quantity,
        @NotNull @Positive
        BigDecimal amount
) {
}
