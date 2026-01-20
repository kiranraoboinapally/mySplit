package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/kiranraoboinapally/mySplit/backend2/config"
	"github.com/kiranraoboinapally/mySplit/backend2/controllers"
	"github.com/kiranraoboinapally/mySplit/backend2/middleware"
)

func main() {
	// Load .env file
	godotenv.Load()

	// Connect to database
	config.ConnectDatabase()

	r := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// Public Routes
	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/signin", controllers.Login)
			auth.POST("/signup", controllers.Register)
		}
	}

	// Protected Routes
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// Expenses
		protected.GET("/expenses", controllers.GetExpenses)
		protected.POST("/expenses", controllers.CreateExpense)
		protected.DELETE("/expenses/:id", controllers.DeleteExpense)

		// Categories
		protected.GET("/categories", controllers.GetCategories)
		protected.POST("/categories", controllers.CreateCategory)

		// Shared Expenses
		protected.GET("/shared/owed", controllers.GetOwedByMe)
		protected.GET("/shared/lended", controllers.GetLendedByMe)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server is running on port %s\n", port)
	r.Run(":" + port)
}
