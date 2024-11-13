import axiosInstance from "../api/axiosConfig";

export const loginUser = async (credentials) => {
    try {
        // Pass credentials (email, password) to the API
        const response = await axiosInstance.post('/api/login', credentials);
        return response.data; // Assuming response.data contains user role and other info
    } catch (error) {
        console.error("Error during login:", error);
        if (error.response) {
            throw error.response.data;
        } else {
            throw error.message || 'Unknown error occurred during login';
        }
    }
};
