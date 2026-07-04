package com.epiis.mi_app.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart_shopping")
public class CartItem {
    @Id
    private String idCarItem;
    @ManyToOne
    @JoinColumn(name = "idPerson")
    private User user;
    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id")
    private Category category;
    private Integer quantity;
    private BigDecimal price; // Precio al momento de agregar
    private String sessionId;

}
