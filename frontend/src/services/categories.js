import ExpenseService from '../services/expenses';

const createCategory = (category) => {
    return ExpenseService.createCategory(category);
};

const CategoryService = {
    createCategory
};

export default CategoryService;
