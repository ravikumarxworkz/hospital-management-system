package com.hospital.config;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.hospital.serviceImpl.UserDetailsServiceImpl;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl detailsServiceImpl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
            .authorizeHttpRequests(registry -> {
                // Public endpoints
                registry.requestMatchers("/", "/home","/api/**", "/api/patients/register", "/api/login").permitAll();

                // Role-based endpoints
                registry.requestMatchers("/api/admin/**").hasRole("ADMIN");
                registry.requestMatchers("/api/doctor/**").hasRole("DOCTOR");
                registry.requestMatchers("/api/nurse/**").hasRole("NURSE");
                registry.requestMatchers("/api/staff/**").hasRole("STAFF");
                registry.requestMatchers("/api/patients/**").hasRole("PATIENT");
                
                // Any other request needs to be authenticated
                registry.anyRequest().authenticated();
            })
            .formLogin(form -> 
                form.loginPage("/api/login")
                    .successHandler(authenticationSuccessHandler())  // Use custom success handler
                    .permitAll()
            )
            .logout(logout -> 
                logout.logoutUrl("/api/logout")
                    .logoutSuccessUrl("/home")
                    .permitAll()
            );

        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(detailsServiceImpl);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Define the AuthenticationManager bean
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                   .userDetailsService(detailsServiceImpl)
                   .passwordEncoder(passwordEncoder())
                   .and()
                   .build();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            // Extracting user details from authentication
            Object principal = authentication.getPrincipal();
            if (principal instanceof org.springframework.security.core.userdetails.User) {
                org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) principal;

                // Map authorities to a list of authority names (as strings)
                String authorities = user.getAuthorities().stream()
                                         .map(grantedAuthority -> grantedAuthority.getAuthority())  // Get the authority as a string
                                         .collect(Collectors.joining(","));  // Join them into a single string

                // You can add the user details to the response or session here
                // For example, send JSON response with email, role, etc.
                response.setStatus(200);
                response.getWriter().write("{\"email\":\"" + user.getUsername() + "\", \"role\":\"" + authorities + "\"}");
                response.getWriter().flush();
            }
        };
    }
}
