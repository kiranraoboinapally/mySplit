package models

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey"`
	Name         string    `gorm:"not null"`
	Email        string    `gorm:"unique;not null"`
	PasswordHash string    `gorm:"not null;column:password_hash"`
	CreatedAt    time.Time `gorm:"autoCreateTime"`
}
