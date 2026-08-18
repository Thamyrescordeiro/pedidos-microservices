package com.microservices.order_service.messaging;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.AbstractJackson2MessageConverter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

@Value("${app.rabbitmq.exchange}")
private String exchangeName;

@Bean
    public TopicExchange orderExchange(){
    return  new TopicExchange(exchangeName,true,false);
}
@Bean
    public MessageConverter jsonMessageConverter(){
    return new Jackson2JsonMessageConverter();
    }

}
