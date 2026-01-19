package com.expense.tracker.controller;

import com.expense.tracker.model.Category;
import com.expense.tracker.model.User;
import com.expense.tracker.repository.CategoryRepository;
import com.expense.tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<Category> getUserCategories() {
        return categoryRepository.findByUserId(getCurrentUser().getId());
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        category.setUser(getCurrentUser());
        return categoryRepository.save(category);
    }
}
