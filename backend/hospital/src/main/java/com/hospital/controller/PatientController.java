
package com.hospital.controller;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.PatientRegistrationRequest;
import com.hospital.dto.PatientResponse;
import com.hospital.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

	@Autowired
	private PatientService patientService;

	@PostMapping("/register")
	public ResponseEntity<?> registerPatient(@Valid @RequestBody PatientRegistrationRequest request,
			BindingResult result) {
		if (result.hasErrors()) {
			System.out.println("result"+result);
			// Collect all validation errors
			String errorMessages = result.getFieldErrors().stream()
					.map(error -> error.getField() + ": " + error.getDefaultMessage())
					.collect(Collectors.joining(", "));
			return ResponseEntity.badRequest().body(errorMessages);
		}

		// Register patient if validation passes
		PatientResponse response = patientService.registerPatient(request);
		
		return ResponseEntity.ok(response);
	}

	@GetMapping("/profile")
	public String getPatientProfile() {
		return "Welcome to the Patient Profile";
	}
}
