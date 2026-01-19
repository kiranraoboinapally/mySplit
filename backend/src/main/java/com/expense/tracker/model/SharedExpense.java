package com.expense.tracker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "shared_expenses")
@Data
@NoArgsConstructor
public class SharedExpense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expense_id", nullable = false)
    private Expense expense;

    @ManyToOne
    @JoinColumn(name = "payer_user_id", nullable = false)
    private User payer;

    @ManyToOne
    @JoinColumn(name = "debtor_user_id", nullable = false)
    private User debtor;

    @Column(name = "amount_owed", nullable = false)
    private BigDecimal amountOwed;

    @Column(name = "is_settled")
    private boolean isSettled;
}
