package models

type Category struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	UserID uint   `gorm:"not null" json:"userId"`
	Name   string `gorm:"not null" json:"name"`
	Type   string `json:"type"` // 'EXPENSE' or 'INCOME'
	Icon   string `json:"icon"`
}
