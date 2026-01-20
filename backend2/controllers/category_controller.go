package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend2/config"
	"github.com/kiranraoboinapally/mySplit/backend2/models"
)

func CreateCategory(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var category models.Category

	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category.UserID = uint(userID.(float64))

	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, category)
}

func GetCategories(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var categories []models.Category

	if err := config.DB.Where("user_id = ?", userID).Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categories)
}
