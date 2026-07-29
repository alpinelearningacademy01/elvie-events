import axios from 'axios';

const API_URL = 'http://localhost:5001/api/client-directory';

const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('elvie_auth_user');
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

export interface ClientDirectoryEntry {
    _id?: string;
    contactName: string;
    company: string;
    role: string;
    email: string;
    phone: string;
    whatsapp: string;
    website: string;
    address: string;
    category: 'client' | 'lead' | 'vip' | 'partner' | 'vendor' | 'other';
    notes: string;
    tags: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface GetClientsParams {
    search?: string;
    category?: string;
    page?: number;
    limit?: number;
}

export const getClients = async (params: GetClientsParams = {}) => {
    const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
        params
    });
    return response.data;
};

export const getClientById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const createClient = async (data: Partial<ClientDirectoryEntry>) => {
    const response = await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }
    });
    return response.data;
};

export const updateClient = async (id: string, data: Partial<ClientDirectoryEntry>) => {
    const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }
    });
    return response.data;
};

export const deleteClient = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    return response.data;
};
