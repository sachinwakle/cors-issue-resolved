package io.sawa.webapp.resource;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.sawa.webapp.model.User;
import io.sawa.webapp.service.UserService;

@RestController
@RequestMapping("/api")
public class UserResource {

    @Autowired
    UserService userService;

    @GetMapping
    public String sayHello() {
	return "<h1>It works</h1>";
    }

    @GetMapping("/users")
    public Collection<User> getUsers() {
	return userService.getUsers();
    }

}
