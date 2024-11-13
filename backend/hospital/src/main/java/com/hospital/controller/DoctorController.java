package com.hospital.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @GetMapping("/profile")
    public String getDoctorProfile() {
        return "Welcome to the Doctor Profile";
    }
}
