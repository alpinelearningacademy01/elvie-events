import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
const API_URL = `${API_BASE_URL}/inquiries`;

const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('elvie_auth_user');
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        return {
            'Authorization': `Bearer ${token}`
        };
    }
    return {};
};

export const createInquiry = async (inquiryData: any) => {
    try {
        const response = await axios.post(API_URL, inquiryData);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to send inquiry'
        };
    }
};

export const createElvieInquiry = async (inquiryData: any) => {
    try {
        const response = await axios.post(`${API_URL}/elvie`, inquiryData);
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to send inquiry'
        };
    }
};

export const getInquiries = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch inquiries'
        };
    }
};

export const updateInquiryStatus = async (id: string, status: string) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { status }, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to update status'
        };
    }
};

export const requestInquiryAccess = async (id: string) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/request`, {}, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to request access'
        };
    }
};

export const unlockInquiry = async (id: string) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/unlock`, {}, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to unlock inquiry'
        };
    }
};
