package com.expense.tracker.repository;

import com.expense.tracker.model.SharedExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SharedExpenseRepository extends JpaRepository<SharedExpense, Long> {
    List<SharedExpense> findByPayerId(Long payerId);
    List<SharedExpense> findByDebtorId(Long debtorId);
}
