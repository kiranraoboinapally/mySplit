package models

import (
	"time"
)

type Expense struct {
	ID                 uint      `gorm:"primaryKey" json:"id"`
	UserID             uint      `gorm:"not null" json:"userId"`
	CategoryID         *uint     `json:"categoryId"`
	ItemName           string    `gorm:"column:item_name;not null" json:"itemName"`
	Quantity           *float64  `json:"quantity"`
	Unit               string    `json:"unit"` // kg, litre, pieces, etc.
	PricePerUnit       *float64  `gorm:"column:price_per_unit;type:decimal(19,2)" json:"pricePerUnit"`
	TotalAmount        float64   `gorm:"column:total_amount;not null;type:decimal(19,2)" json:"totalAmount"`
	Date               time.Time `gorm:"not null;type:date" json:"date"`
	Notes              string    `json:"notes"`
	BillImageURL       string    `gorm:"column:bill_image_url" json:"billImageUrl"`
	IsRecurring        bool      `gorm:"column:is_recurring" json:"isRecurring"`
	RecurringFrequency string    `gorm:"column:recurring_frequency" json:"recurringFrequency"` // DAILY, WEEKLY, MONTHLY
	
	// Associations
	User     User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Category *Category `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
}
