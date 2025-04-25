package pf.socredo.socmarket.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/hello")
    public String sayHello(){
        return "Hello, Spring Boot!";
    }
}
// Test d'une api qui renvoie au endpoint localhost:8080/api/hello une page affichant un message "Hello, Spring Boot!"