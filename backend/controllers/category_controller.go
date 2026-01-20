package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend/config"
	"github.com/kiranraoboinapally/mySplit/backend/models"
)

// GetCategories retrieves all categories or filtered by level
func GetCategories(c *gin.Context) {
	var categories []models.Category
	query := config.DB

	// Optional filter by level (0, 1, 2)
	levelParam := c.Query("level")
	if levelParam != "" {
		level, err := strconv.Atoi(levelParam)
		if err == nil {
			query = query.Where("level = ?", level)
		}
	}

	// Optional filter by parent_id
	parentParam := c.Query("parent_id")
	if parentParam != "" {
		query = query.Where("parent_id = ?", parentParam)
	}

	if err := query.Order("name ASC").Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categories)
}

// GetCategoryChildren retrieves child categories of a specific parent
func GetCategoryChildren(c *gin.Context) {
	parentID := c.Param("id")
	var categories []models.Category

	if err := config.DB.Where("parent_id = ?", parentID).Order("name ASC").Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categories)
}

// GetCategoryTree retrieves the full category tree
func GetCategoryTree(c *gin.Context) {
	var topLevel []models.Category

	// Get all top-level categories (level = 0)
	if err := config.DB.Where("level = 0").
		Preload("Children").
		Preload("Children.Children").
		Order("name ASC").
		Find(&topLevel).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, topLevel)
}

// CreateCategory creates a new category (admin use only, typically for seeding)
func CreateCategory(c *gin.Context) {
	var category models.Category

	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, category)
}
