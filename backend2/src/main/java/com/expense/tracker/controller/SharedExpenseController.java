package com.expense.tracker.controller;

import com.expense.tracker.model.SharedExpense;
import com.expense.tracker.model.User;
import com.expense.tracker.repository.SharedExpenseRepository;
import com.expense.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/shared")
public class SharedExpenseController {

    @Autowired
    private SharedExpenseRepository sharedRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/owed")
    public List<SharedExpense> getOwedByMe() {
        return sharedRepository.findByDebtorId(getCurrentUser().getId());
    }
    
    @GetMapping("/lended")
    public List<SharedExpense> getLendedByMe() {
        return sharedRepository.findByPayerId(getCurrentUser().getId());
    }
}
