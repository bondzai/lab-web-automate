package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"log"
	config "web-scrape/config"
)

func main() {
	app := fiber.New(fiber.Config{
		Immutable: true,
	})

	app.Get("/metrics", monitor.New(monitor.Config{Title: "Service Metrics"}))

	app.Get("/", func(c *fiber.Ctx) error {

		return c.SendString("Hello")
	})

	port := config.GetEnv("PORT", "30010")
	err := app.Listen(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
