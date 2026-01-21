package config

import (
	"fmt"
	"log"
	"os"

	"github.com/kiranraoboinapally/mySplit/backend/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func ConnectDatabase() {
	// Read env vars (works locally + Railway)
	dbUser := getEnv("DB_USER", os.Getenv("MYSQLUSER"))
	dbPassword := getEnv("DB_PASSWORD", os.Getenv("MYSQLPASSWORD"))
	dbHost := getEnv("DB_HOST", os.Getenv("MYSQLHOST"))
	dbPort := getEnv("DB_PORT", os.Getenv("MYSQLPORT"))
	dbName := getEnv("DB_NAME", os.Getenv("MYSQLDATABASE"))

	// Safety checks
	if dbUser == "" || dbPassword == "" || dbHost == "" || dbPort == "" || dbName == "" {
		log.Fatal("❌ Database environment variables are missing")
	}

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPassword, dbHost, dbPort, dbName,
	)

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	DB = database
	fmt.Println("✅ Database connected")

	// Auto-migrate only in local
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		database.AutoMigrate(
			&models.User{},
			&models.Category{},
			&models.Expense{},
			&models.SharedExpense{},
		)
	}
}
