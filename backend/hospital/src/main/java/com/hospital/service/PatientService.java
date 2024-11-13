package com.hospital.service;

import com.hospital.dto.PatientRegistrationRequest;
import com.hospital.dto.PatientResponse;

public interface PatientService {

     public PatientResponse  registerPatient(PatientRegistrationRequest request);

}
