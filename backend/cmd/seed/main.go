package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/kiranraoboinapally/mySplit/backend/config"
)

func main() {
	fmt.Println("Starting database seeding...")

	// Load .env from backend root (assuming running from backend root or adjusting path)
	// Try loading from current directory or parent
	if err := godotenv.Load(); err != nil {
		// Try parent directory if running from cmd/seed
		if err := godotenv.Load("../../.env"); err != nil {
			fmt.Println("Warning: Could not load .env file")
		}
	}

	// Connect to database
	config.ConnectDatabase()

	// Read SQL file
	// Assuming running from backend root: "config/seed_categories.sql"
	sqlFile := "config/seed_categories.sql"
	content, err := os.ReadFile(sqlFile)
	if err != nil {
		// Try relative path if running from cmd/seed
		sqlFile = "../../config/seed_categories.sql"
		content, err = os.ReadFile(sqlFile)
		if err != nil {
			fmt.Printf("Error reading SQL file: %v\n", err)
			return
		}
	}

	// Execute SQL
	// Split by semicolon to execute multiple statements (Gorm/Driver might not support multi-statement strings directly in all modes, safest to split)
	statements := strings.Split(string(content), ";")

	for _, stmt := range statements {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}
		if err := config.DB.Exec(stmt).Error; err != nil {
			// Some statements might fail if tables don't exist yet or other constraints.
			// For this specific seed file which drops/creates, it should be fine.
			// Ignore Empty query error
			fmt.Printf("Error executing statement: %v\nQuery: %s\n", err, stmt[:min(len(stmt), 50)]+"...")
		}
	}

	fmt.Println("Seeding completed successfully!")
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
