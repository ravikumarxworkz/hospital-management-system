import axiosInstance from "../api/axiosConfig";

export const registerPatient = async (patientData) => {
  try {
    const response = await axiosInstance.post('api/patients/register', patientData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);

    if (error.response) {
      // Assuming backend sends a field error map as a response
      const errorData = error.response.data;

      // Check if the error is for the 'password' field and set that in your errors
      if (errorData.password) {
        throw new Error(errorData.password);  // This will be displayed in the UI
      } else {
        // Handle other errors
        throw errorData.message || 'Unknown error occurred during registration';
      }
    } else {
      throw error.message || 'Unknown error occurred during registration';
    }
  }
};



export const fetchAllPatients = async () => {
    try {
      const response = await axiosInstance.get('/patients/all');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };