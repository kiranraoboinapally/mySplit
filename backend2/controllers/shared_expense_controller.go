package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend2/config"
	"github.com/kiranraoboinapally/mySplit/backend2/models"
)

func GetOwedByMe(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var shared []models.SharedExpense

	if err := config.DB.Where("debtor_user_id = ?", userID).Preload("Expense").Preload("Payer").Find(&shared).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, shared)
}

func GetLendedByMe(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var shared []models.SharedExpense

	if err := config.DB.Where("payer_user_id = ?", userID).Preload("Expense").Preload("Debtor").Find(&shared).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, shared)
}
