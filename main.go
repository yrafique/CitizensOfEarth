package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

// Simulated database for UN issues and votes
var unIssues = []string{"Climate Change", "Global Health", "Peacekeeping"}
var votes = make(map[string]int)

func getUNIssues(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request for UN issues")
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(unIssues)
	if err != nil {
		log.Printf("Error encoding UN issues: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
	log.Println("UN issues sent successfully")
}

func voteIssue(w http.ResponseWriter, r *http.Request) {
	log.Println("Received vote request")
	if r.Method != "POST" {
		log.Printf("Unsupported method for voting: %s", r.Method)
		http.Error(w, "Unsupported method", http.StatusMethodNotAllowed)
		return
	}
	var issue string
	err := json.NewDecoder(r.Body).Decode(&issue)
	if err != nil {
		log.Printf("Error decoding vote request: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Increment the vote for the issue
	votes[issue]++
	log.Printf("Vote recorded for issue: %s", issue)
	w.WriteHeader(http.StatusNoContent)
}

func getVotes(w http.ResponseWriter, r *http.Request) {
	log.Println("Received request for vote counts")
	w.Header().Set("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(votes)
	if err != nil {
		log.Printf("Error encoding votes: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
	}
	log.Println("Vote counts sent successfully")
}

func main() {
	http.HandleFunc("/un_issues", getUNIssues)
	http.HandleFunc("/vote_issue", voteIssue)
	http.HandleFunc("/get_votes", getVotes)
	// Serve static files like index.html directly
	http.Handle("/", http.FileServer(http.Dir(".")))

	srv := &http.Server{
		Addr:         ":8080",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
	}

	log.Println("Starting server on :8080")
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatal("Server failed to start: ", err)
	}
}
