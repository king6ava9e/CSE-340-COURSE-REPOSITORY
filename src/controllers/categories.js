// Get the categories from the database
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments, createCategory, updateCategory

} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Server-side validation for creating a category
const categoryValidation = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

// Display all service categories
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

// Display the details of one category and its projects
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projects });
};

// Display the assign categories form for a project
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

// Process the assign categories form submission
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const categoryIds = req.body.categoryIds || [];

    await updateCategoryAssignments(projectId, categoryIds);

    req.flash('success', 'Project categories updated successfully!');

    res.redirect(`/project/${projectId}`);
};


// Display the new category form
const showNewCategoryForm = (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

// Process the new category form
const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const title = 'Create New Category';

        return res.render('new-category', {
            title,
            errors: errors.array(),
            data: req.body
        });
    }

    const { name } = req.body;

    await createCategory(name);

    req.flash('success', 'Category created successfully!');

    res.redirect('/categories');
};


// Display the edit category form
const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        categoryDetails
    });
};

// Process the edit category form
const processEditCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    const categoryId = req.params.id;

    if (!errors.isEmpty()) {
        const categoryDetails = await getCategoryDetails(categoryId);
        const title = 'Edit Category';

        return res.render('edit-category', {
            title,
            categoryDetails,
            errors: errors.array(),
            data: req.body
        });
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};

// Export the controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm, showNewCategoryForm,
    processNewCategoryForm, showEditCategoryForm,
    processEditCategoryForm, categoryValidation

};