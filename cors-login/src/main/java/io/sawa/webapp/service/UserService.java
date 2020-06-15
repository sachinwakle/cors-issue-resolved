package io.sawa.webapp.service;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Service;

import io.sawa.webapp.model.User;

@Service
public class UserService {
    ConcurrentMap<Integer, User> users = new ConcurrentHashMap<>();

    public Collection<User> getUsers() {
	users.put(1, new User(1, "Elwin", "Bolino", "ebolino0@cam.ac.uk", "Male", "193.141.4.74"));
	users.put(2, new User(2, "Wallis", "Christofor", "wchristofor1@state.gov", "Male", "40.52.240.125"));
	users.put(3, new User(3, "Sibel", "Dumbellow", "sdumbellow2@utexas.edu", "Female", "225.251.187.61"));

	return users.values();
    }

}
