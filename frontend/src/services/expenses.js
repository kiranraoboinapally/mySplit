import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

const signup = (name, email, password) => {
    return axios.post(`${API_URL}/auth/signup`, { name, email, password });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/auth/signin`, { email, password });
};

const getAllExpenses = () => {
    return axios.get(`${API_URL}/expenses`, { headers: getAuthHeader() });
};

const createExpense = (expense) => {
    return axios.post(`${API_URL}/expenses`, expense, { headers: getAuthHeader() });
};

const deleteExpense = (id) => {
    return axios.delete(`${API_URL}/expenses/${id}`, { headers: getAuthHeader() });
};

const getCategories = () => {
    return axios.get(`${API_URL}/categories`, { headers: getAuthHeader() });
};

const createCategory = (category) => {
    return axios.post(`${API_URL}/categories`, category, { headers: getAuthHeader() });
};

const getSharedOwed = () => {
    return axios.get(`${API_URL}/shared/owed`, { headers: getAuthHeader() });
};

const getSharedLended = () => {
    return axios.get(`${API_URL}/shared/lended`, { headers: getAuthHeader() });
};

const getSpendingAnalysis = () => {
    return axios.get(`${API_URL}/reports/spending`, { headers: getAuthHeader() });
};

const getCategoriesByLevel = (level) => {
    return axios.get(`${API_URL}/categories?level=${level}`, { headers: getAuthHeader() });
};

const getCategoryChildren = (parentId) => {
    return axios.get(`${API_URL}/categories/${parentId}/children`, { headers: getAuthHeader() });
};

const getCategoryTree = () => {
    return axios.get(`${API_URL}/categories/tree`, { headers: getAuthHeader() });
};

const ExpenseService = {
    signup,
    login,
    getAllExpenses,
    createExpense,
    deleteExpense,
    getCategories,
    createCategory,
    getSharedOwed,
    getSharedLended,
    getSpendingAnalysis,
    getCategoriesByLevel,
    getCategoryChildren,
    getCategoryTree
};

export default ExpenseService;
