package com.epiis.mi_app.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
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

    public User getUser() {
        return user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getIdCarItem() {
        return idCarItem;
    }

    public void setIdCarItem(String idCarItem) {
        this.idCarItem = idCarItem;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

}
