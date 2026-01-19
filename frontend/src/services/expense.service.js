import api from '../api/axios';

const getAllExpenses = async () => {
    const response = await api.get('/expenses');
    return response.data;
};

const createExpense = async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
};

const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
};

const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

const createCategory = async (name, type) => {
    const response = await api.post('/categories', { name, type });
    return response.data;
};

const ExpenseService = {
    getAllExpenses,
    createExpense,
    deleteExpense,
    getCategories,
    createCategory
};

export default ExpenseService;
