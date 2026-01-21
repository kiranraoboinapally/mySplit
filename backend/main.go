package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	appconfig "github.com/kiranraoboinapally/mySplit/backend/config"
	"github.com/kiranraoboinapally/mySplit/backend/controllers"
	"github.com/kiranraoboinapally/mySplit/backend/middleware"
)

func main() {
	// Load .env ONLY for local development
	if os.Getenv("RAILWAY_ENVIRONMENT") == "" {
		_ = godotenv.Load()
	}

	// Connect Database
	appconfig.ConnectDatabase()

	r := gin.Default()

	// CORS setup
	corsConfig := cors.DefaultConfig()

	// Local + Vercel
	corsConfig.AllowOrigins = []string{
		"http://localhost:3000",
		"https://mysplit-two.vercel.app/login",
	}

	corsConfig.AllowMethods = []string{
		"GET", "POST", "PUT", "DELETE", "OPTIONS",
	}

	corsConfig.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Authorization",
	}

	r.Use(cors.New(corsConfig))

	// API Routes
	api := r.Group("/api")

	// Health check
	api.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Public routes
	auth := api.Group("/auth")
	{
		auth.POST("/signin", controllers.Login)
		auth.POST("/signup", controllers.Register)
	}

	// Protected routes
	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/expenses", controllers.GetExpenses)
		protected.POST("/expenses", controllers.CreateExpense)
		protected.DELETE("/expenses/:id", controllers.DeleteExpense)

		protected.GET("/categories", controllers.GetCategories)
		protected.GET("/categories/tree", controllers.GetCategoryTree)
		protected.GET("/categories/:id/children", controllers.GetCategoryChildren)
		protected.POST("/categories", controllers.CreateCategory)

		protected.GET("/shared/owed", controllers.GetOwedByMe)
		protected.GET("/shared/lended", controllers.GetLendedByMe)

		protected.GET("/reports/spending", controllers.GetSpendingAnalysis)
	}

	// PORT handling (Railway compatible)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("🚀 Server running on port", port)
	r.Run(":" + port)
}
