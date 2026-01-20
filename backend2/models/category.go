package models

type Category struct {
	ID     uint   `gorm:"primaryKey"`
	UserID uint   `gorm:"not null"`
	Name   string `gorm:"not null"`
	Type   string // 'EXPENSE' or 'INCOME'
	Icon   string
}
