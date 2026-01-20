package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend/config"
	"github.com/kiranraoboinapally/mySplit/backend/models"
)

type MonthlyAnalysis struct {
	TotalSpent   float64         `json:"totalSpent"`
	ByCategory   map[string]float64 `json:"byCategory"`
	DailyTrend   []DailySpending `json:"dailyTrend"`
}

type DailySpending struct {
	Date   string  `json:"date"`
	Amount float64 `json:"amount"`
}

func GetSpendingAnalysis(c *gin.Context) {
	userID, _ := c.Get("user_id")
	
	// Default to current month if not specified
	now := time.Now()
	startDate := time.Date(now.Year(), now.Month(), 1, 0, 0, 0, 0, now.Location())
	endDate := startDate.AddDate(0, 1, 0)

	var expenses []models.Expense
	if err := config.DB.Where("user_id = ? AND date >= ? AND date < ?", userID, startDate, endDate).Preload("Category").Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	analysis := MonthlyAnalysis{
		ByCategory: make(map[string]float64),
		DailyTrend: []DailySpending{},
	}

	dailyMap := make(map[string]float64)

	for _, exp := range expenses {
		analysis.TotalSpent += exp.TotalAmount
		
		catName := "Uncategorized"
		if exp.Category.ID != 0 {
			catName = exp.Category.Name
		}
		analysis.ByCategory[catName] += exp.TotalAmount
		
		dayStr := exp.Date.Format("2006-01-02")
		dailyMap[dayStr] += exp.TotalAmount
	}

	// Flatten daily map to slice
	for d := startDate; d.Before(endDate); d = d.AddDate(0, 0, 1) {
		dayStr := d.Format("2006-01-02")
		amount := 0.0
		if val, ok := dailyMap[dayStr]; ok {
			amount = val
		}
		// Only add days up to today if looking at current month
		if d.After(now) {
			break 
		}
		analysis.DailyTrend = append(analysis.DailyTrend, DailySpending{
			Date:   dayStr,
			Amount: amount,
		})
	}

	c.JSON(http.StatusOK, analysis)
}
