package com.microservices.order_service.api;

import com.microservices.order_service.domain.Order;
import com.microservices.order_service.domain.OrderRepository;
import com.microservices.order_service.messaging.OrderEventPublisher;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderEventPublisher orderEventPublisher;


    public OrderService(OrderRepository orderRepository, OrderEventPublisher orderEventPublisher) {
        this.orderRepository = orderRepository;
        this.orderEventPublisher = orderEventPublisher;
    }

    @Transactional
    public OrderResponse createOrder(OrderRequest request){
        Order order = new Order();
        order.setCustomerName(request.customerName());
        order.setItem(request.item());
        order.setQuantity(request.quantity());
        order.setAmount(request.amount());

        Order saved = orderRepository.save(order);
        orderEventPublisher.publishOrderCreated(saved);

        return OrderResponse.from(saved);
    }

    public OrderResponse getOrder(UUID id){
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pedido nao encontrado: " + id));
        return  OrderResponse.from(order);
    }
}
