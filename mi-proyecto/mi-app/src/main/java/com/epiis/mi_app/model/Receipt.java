package com.epiis.mi_app.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

}
