package com.example.demo.controller;

import com.example.demo.model.Joke;
import com.example.demo.repository.JokeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jokes")
public class JokeController {

    @Autowired
    private JokeRepository jokeRepository;

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

}
