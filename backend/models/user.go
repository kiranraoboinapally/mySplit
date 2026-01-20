package models

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Name         string    `gorm:"not null" json:"name"`
	Email        string    `gorm:"unique;not null" json:"email"`
	PasswordHash string    `gorm:"not null;column:password_hash" json:"-"`
	CreatedAt    time.Time `gorm:"autoCreateTime" json:"createdAt"`
}
