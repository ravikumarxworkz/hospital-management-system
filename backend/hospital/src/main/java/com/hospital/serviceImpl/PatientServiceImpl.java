// File: com.hospital.serviceImpl.PatientServiceImpl.java
package com.hospital.serviceImpl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hospital.dto.PatientRegistrationRequest;
import com.hospital.dto.PatientResponse;
import com.hospital.entity.Patient;
import com.hospital.entity.User;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.mapper.PatientMapper;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.UserRepository;
import com.hospital.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public PatientResponse registerPatient(PatientRegistrationRequest request) {
        if (request != null) {
            // Check if the email is already registered
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new EmailAlreadyExistsException("Email is already registered");
            }

            // Step 1: Save User (Authentication Details)
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole("ROLE_PATIENT");
            user.setIsActive(true);
            User savedUser = userRepository.save(user);

            // Step 2: Save Patient (Profile Details)
            Patient patient = new Patient();
            BeanUtils.copyProperties(request, patient);
            patient.setUserId(savedUser.getId()); // Store only userId
            Patient savedPatient = patientRepository.save(patient);

            // Step 3: Return the Response using PatientMapper
            return PatientMapper.toPatientResponse(savedPatient);
        }
        return null;
    }

}
