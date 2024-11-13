package com.hospital.controller;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.User;
import com.hospital.serviceImpl.UserDetailsServiceImpl;

import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @PostMapping("/loginUser")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
    	System.out.println("this login controllerr===========");
    	System.out.println(loginRequest);
        try {
            // Authenticate using the authentication manager
            UsernamePasswordAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            
            authenticationManager.authenticate(authenticationToken);

            // If authentication is successful, set the security context
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            User authenticatedUser = (User) userDetails;

            // Return the authenticated user
            return ResponseEntity.ok(authenticatedUser);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

