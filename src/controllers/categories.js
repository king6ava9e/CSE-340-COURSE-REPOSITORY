// Get the categories from the database
import { getAllCategories } from '../models/categories.js';

// Display all service categories
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

// Make the controller available to the routes
export { showCategoriesPage };