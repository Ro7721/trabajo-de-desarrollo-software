package com.epiis.mi_app.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epiis.mi_app.dto.CartItemDto;
import com.epiis.mi_app.model.CartItem;
import com.epiis.mi_app.model.Product;
import com.epiis.mi_app.model.responseobject.CartResponse;
import com.epiis.mi_app.repository.CartRepository;
import com.epiis.mi_app.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class CartServices {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;

    public void addToCart(String productId, Integer quantity, String sessionId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        if (product.getStock() < quantity) {
            throw new RuntimeException("Stock Insuficiente para este producto");
        }

        CartItem existing = cartRepository.findBySessionIdAndProductIdProduct(sessionId, productId);
        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity);
            cartRepository.save(existing);
        } else {
            CartItem newItem = new CartItem();
            newItem.setIdCarItem(UUID.randomUUID().toString());
            newItem.setSessionId(sessionId);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPrice(product.getPrice());

            cartRepository.save(newItem);
        }
    }

    public CartResponse getCart(String sessionid) {
        List<CartItem> items = cartRepository.findBySessionId(sessionid);
        CartResponse response = new CartResponse();
        List<CartItemDto> itemDto = new ArrayList<>();
        BigDecimal noun = BigDecimal.ZERO;
        Integer totalItem = 0;

        for (CartItem item : items) {
            CartItemDto dto = new CartItemDto();
            dto.setIdCar(item.getIdCarItem());
            // Verificar si el usuario existe antes de acceder a su ID
            dto.setIdPerson(item.getUser() != null ? item.getUser().getIdPerson() : null);
            dto.setIdProduct(item.getProduct().getIdProduct());
            dto.setName(item.getProduct().getName());
            dto.setCategory(item.getProduct().getCategory());
            dto.setImageUrl(item.getProduct().getImageUrl());
            dto.setQuantity(item.getQuantity());
            dto.setUnitPrice(item.getPrice());
            dto.setStock(item.getProduct().getStock()); // Incluir stock disponible
            // calcular subtotal del item
            BigDecimal itemNoun = item.getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity()));
            dto.setNoun(itemNoun);
            itemDto.add(dto);
            noun = noun.add(itemNoun);
            totalItem += item.getQuantity();
        }
        // calcular total con igv(18%)
        BigDecimal igv = noun.multiply(new BigDecimal("0.18"));
        BigDecimal total = noun.add(igv);

        response.setItems(itemDto);
        response.setNoun(noun);
        response.setIgv(igv);
        response.setTotal(total);
        response.setTotalItems(totalItem);
        return response;
    }

    public void updateQuantity(String itemId, Integer quantity) {
        CartItem item = cartRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        if (quantity <= 0) {
            cartRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartRepository.save(item);
        }
    }

    public void remoreItem(String itemId) {
        cartRepository.deleteById(itemId);
    }

    @Transactional
    public void clearCart(String sessionId) {
        cartRepository.deleteBySessionId(sessionId);
    }
}
