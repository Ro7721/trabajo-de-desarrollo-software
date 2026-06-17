package com.epiis.mi_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.mi_app.model.CartItem;
import com.epiis.mi_app.model.User;

public interface CartRepository extends JpaRepository<CartItem, String> {
    CartItem findBySessionIdAndProductIdProduct(String sessionid, String productid);

    List<CartItem> findBySessionId(String sessionId);

    List<CartItem> findByUser(User user);

    void deleteBySessionId(String id);
}
