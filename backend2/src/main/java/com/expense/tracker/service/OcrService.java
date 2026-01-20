package com.expense.tracker.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class OcrService {

    public Map<String, Object> extractData(MultipartFile file) {
        // Mock Implementation
        // In reality, this would call Tesseract or Google Cloud Vision API
        Map<String, Object> data = new HashMap<>();
        data.put("itemName", "Scanned Item (Mock)");
        data.put("totalAmount", new BigDecimal("123.45"));
        data.put("date", "2023-10-27");
        return data;
    }
}
