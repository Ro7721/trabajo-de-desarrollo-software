package com.epiis.mi_app.model.responseobject;

import java.math.BigDecimal;
import java.util.List;

import com.epiis.mi_app.dto.CartItemDto;

public class CartResponse {
    private List<CartItemDto> items;
    private BigDecimal noun;// subtotal
    private BigDecimal igv;
    private BigDecimal total;
    private Integer totalItems;

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }

    public BigDecimal getNoun() {
        return noun;
    }

    public void setNoun(BigDecimal noun) {
        this.noun = noun;
    }

    public BigDecimal getIgv() {
        return igv;
    }

    public void setIgv(BigDecimal igv) {
        this.igv = igv;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }

}
