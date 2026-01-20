import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kiranraoboinapally/mySplit/backend/config"
	"github.com/kiranraoboinapally/mySplit/backend/models"
)

type CreateExpenseInput struct {
	CategoryID   uint      `json:"categoryId" binding:"required"`
	ItemName     string    `json:"itemName" binding:"required"`
	Quantity     *float64  `json:"quantity"`
	Unit         string    `json:"unit"`
	PricePerUnit *float64  `json:"pricePerUnit"`
	TotalAmount  float64   `json:"totalAmount" binding:"required"`
	Date         string    `json:"date" binding:"required"`
	Notes        string    `json:"notes"`
	IsSplit      bool      `json:"isSplit"`
	SplitWith    []SplitFriend `json:"splitWith"`
}

type SplitFriend struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func CreateExpense(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var input CreateExpenseInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse date
	dateTime, err := time.Parse("2006-01-02T15:04:05.000Z", input.Date)
	if err != nil {
		// Try alternate format
		dateTime, err = time.Parse("2006-01-02", input.Date)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
			return
		}
	}

	expense := models.Expense{
		UserID:       uint(userID.(float64)),
		CategoryID:   input.CategoryID,
		ItemName:     input.ItemName,
		Quantity:     input.Quantity,
		Unit:         input.Unit,
		PricePerUnit: input.PricePerUnit,
		TotalAmount:  input.TotalAmount,
		Date:         dateTime,
		Notes:        input.Notes,
	}

	if err := config.DB.Create(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// If split expense, create shared expense records
	if input.IsSplit && len(input.SplitWith) > 0 {
		totalPeople := len(input.SplitWith) + 1 // +1 for current user
		amountPerPerson := input.TotalAmount / float64(totalPeople)

		for _, friend := range input.SplitWith {
			// For now, we'll store friend info in notes
			// In production, you'd want a separate friends/contacts table
			sharedExpense := models.SharedExpense{
				ExpenseID:    expense.ID,
				PayerUserID:  uint(userID.(float64)), // Current user paid
				DebtorUserID: 0, // Placeholder - would be friend's user ID
				AmountOwed:   amountPerPerson,
				IsSettled:    false,
			}

			// Store friend details in expense notes for now
			expense.Notes += "\nSplit with: " + friend.Name + " (" + friend.Email + ")"

			config.DB.Create(&sharedExpense)
		}

		// Update expense notes
		config.DB.Save(&expense)
	}

	c.JSON(http.StatusOK, expense)
}

func GetExpenses(c *gin.Context) {
	userID, _ := c.Get("user_id")
	var expenses []models.Expense
	
	if err := config.DB.Where("user_id = ?", userID).Preload("Category").Order("date DESC").Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expenses)
}

func DeleteExpense(c *gin.Context) {
	userID, _ := c.Get("user_id")
	id := c.Param("id")

	// Delete associated shared expenses first
	config.DB.Where("expense_id = ?", id).Delete(&models.SharedExpense{})

	// Delete the expense
	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).Delete(&models.Expense{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted"})
}
