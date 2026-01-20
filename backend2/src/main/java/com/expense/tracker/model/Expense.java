package com.expense.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data
@NoArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    private Double quantity;

    private String unit; // kg, litre, pieces, etc.

    @Column(name = "price_per_unit")
    private BigDecimal pricePerUnit;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private LocalDate date;

    private String notes;

    @Column(name = "bill_image_url")
    private String billImageUrl;
    
    @Column(name = "is_recurring")
    private boolean isRecurring;

    @Column(name = "recurring_frequency")
    private String recurringFrequency; // DAILY, WEEKLY, MONTHLY
}
