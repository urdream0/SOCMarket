package pf.socredo.socmarket.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pf.socredo.socmarket.entity.UserEntity;
import pf.socredo.socmarket.services.UserService;



@RestController
@RequestMapping("api/v1/user/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("list")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("create")
    public ResponseEntity<String> createUser(@RequestBody UserEntity user) {
        userService.createUser(user);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable("id") Long id) {
    UserEntity user = userService.getUserById(id);
    if (user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    }

    @PutMapping("{id}")
    public ResponseEntity<String> updateUser(@PathVariable("id") Long id, @RequestBody UserEntity user) {
        userService.updateUser(user);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }
}
    

