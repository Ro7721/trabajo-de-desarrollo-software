package com.epiis.mi_app.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Receipt {
    private String idReceipt;
    private String receiptType;// tipo de recibo
    private LocalDate emissionDate;
    private LocalTime time;
    private Integer assesTotal; // total gravado
    private Integer igv;
    private Integer total;
    private BigDecimal formPayment;// forma de pago
    private Date expirationDate;
    private String currencyType; // tipo de moneda
    @ManyToOne
    @JoinColumn(name = "idPerson")
    private User user;

    public String getIdReceipt() {
        return idReceipt;
    }

    public void setIdReceipt(String idReceipt) {
        this.idReceipt = idReceipt;
    }

    public String getReceiptType() {
        return receiptType;
    }

    public void setReceiptType(String receiptType) {
        this.receiptType = receiptType;
    }

    public LocalDate getEmissionDate() {
        return emissionDate;
    }

    public void setEmissionDate(LocalDate emissionDate) {
        this.emissionDate = emissionDate;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Integer getAssesTotal() {
        return assesTotal;
    }

    public void setAssesTotal(Integer assesTotal) {
        this.assesTotal = assesTotal;
    }

    public Integer getIgv() {
        return igv;
    }

    public void setIgv(Integer igv) {
        this.igv = igv;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public BigDecimal getFormPayment() {
        return formPayment;
    }

    public void setFormPayment(BigDecimal formPayment) {
        this.formPayment = formPayment;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCurrencyType() {
        return currencyType;
    }

    public void setCurrencyType(String currencyType) {
        this.currencyType = currencyType;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
