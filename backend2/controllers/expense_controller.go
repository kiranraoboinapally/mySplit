package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend2/config"
	"github.com/kiranraoboinapally/mySplit/backend2/models"
)

func CreateExpense(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var expense models.Expense

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	expense.UserID = uint(userID.(float64)) // JWT claims parsing often results in float64
	if expense.Date.IsZero() {
		expense.Date = time.Now()
	}

	// Validation for mandatory fields handled by GORM not null constraint, but good to check specifics if needed

	if err := config.DB.Create(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expense)
}

func GetExpenses(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var expenses []models.Expense
	
	// Preload Category and User if needed, though usually just flat list is fine or preload Category
	if err := config.DB.Where("user_id = ?", userID).Preload("Category").Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expenses)
}

func DeleteExpense(c *gin.Context) {
	userID, _ := c.Get("user_id")
	id := c.Param("id")

	// Ensure the expense belongs to the user
	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&models.Expense{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted"})
}
