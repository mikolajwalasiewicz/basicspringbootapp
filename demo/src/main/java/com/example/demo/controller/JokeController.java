package com.example.demo.controller;

import com.example.demo.model.Joke;
import com.example.demo.repository.JokeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/jokes")
public class JokeController {

    @Autowired
    private JokeRepository jokeRepository;

    @GetMapping("/random")
    public Joke getRandomJoke() {
        List<Joke> jokes = jokeRepository.findAll();
        if (jokes.isEmpty()) {
            return null;  // Lub zwróć jakiś domyślny żart
        }
        Random rand = new Random();
        return jokes.get(rand.nextInt(jokes.size()));
    }

    @GetMapping("/{id}")
    public Joke getJokeById(@PathVariable Long id) {
        return jokeRepository.findById(id).orElse(null);
    }

    @GetMapping
    public List<Joke> getAllJokes() {
        List<Joke> jokes = jokeRepository.findAll();
        System.out.println("Znaleziono " + jokes.size() + " żartów.");
        return jokes;
    }

    @PostMapping("/{id}/like")
    public Joke likeJoke(@PathVariable Long id) {
        return jokeRepository.findById(id).map(joke -> {
            joke.setLikes(joke.getLikes() + 1);
            Joke updatedJoke = jokeRepository.save(joke);
            System.out.println("Zaktualizowano żart: " + updatedJoke);
            return updatedJoke;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Joke not found"));
    }

}
