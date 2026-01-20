package models

import "time"

// Category represents a hierarchical category for expenses
type Category struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"not null" json:"name"`
	ParentID    *uint     `json:"parentId,omitempty"`
	Level       int       `gorm:"not null;default:0" json:"level"` // 0=top level, 1=sub, 2=item
	Description string    `json:"description,omitempty"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	
	// Associations
	Parent   *Category   `gorm:"foreignKey:ParentID" json:"parent,omitempty"`
	Children []Category  `gorm:"foreignKey:ParentID" json:"children,omitempty"`
}
