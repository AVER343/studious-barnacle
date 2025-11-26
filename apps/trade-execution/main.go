package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Return a simple JSON to prove routing works
		fmt.Fprintf(w, `{"service": "trade-execution", "status": "ready"}`)
	})

	fmt.Println("Trade Execution running on port 8080")
	http.ListenAndServe(":8080", nil)
}
