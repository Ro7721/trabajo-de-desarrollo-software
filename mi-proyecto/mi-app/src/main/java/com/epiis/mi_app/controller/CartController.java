package com.epiis.mi_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.mi_app.model.requestobject.AddToCartRequest;
import com.epiis.mi_app.model.responseobject.CartResponse;
import com.epiis.mi_app.services.CartServices;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    private CartServices cartServices;

    // AGREGAR producto al carrito
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request,
            HttpServletRequest httpRequest) {
        String sessionId = httpRequest.getSession().getId();
        cartServices.addToCart(request.getProductId(), request.getQuantity(), sessionId);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/getall")
    public ResponseEntity<CartResponse> getCart(HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        CartResponse cart = cartServices.getCart(sessionId);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<?> updateItem(@PathVariable String itemId,
            @RequestParam Integer quantity) {
        cartServices.updateQuantity(itemId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable String itemId) {
        cartServices.remoreItem(itemId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        cartServices.clearCart(sessionId);
        return ResponseEntity.ok().build();
    }

}
