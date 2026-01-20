package models

import (
	"time"
)

type Expense struct {
	ID                 uint      `gorm:"primaryKey"`
	UserID             uint      `gorm:"not null"`
	CategoryID         *uint     
	ItemName           string    `gorm:"column:item_name;not null"`
	Quantity           *float64
	Unit               string    // kg, litre, pieces, etc.
	PricePerUnit       *float64  `gorm:"column:price_per_unit;type:decimal(19,2)"`
	TotalAmount        float64   `gorm:"column:total_amount;not null;type:decimal(19,2)"`
	Date               time.Time `gorm:"not null;type:date"`
	Notes              string
	BillImageURL       string    `gorm:"column:bill_image_url"`
	IsRecurring        bool      `gorm:"column:is_recurring"`
	RecurringFrequency string    `gorm:"column:recurring_frequency"` // DAILY, WEEKLY, MONTHLY
	
	// Associations
	User     User     `gorm:"foreignKey:UserID"`
	Category *Category `gorm:"foreignKey:CategoryID"`
}
