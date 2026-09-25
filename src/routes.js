import express from 'express';

import { showHomePage } from './controllers/index.js';

import { showOrganizationsPage } from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    projectValidation,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';


const router = express.Router();

// Connect each URL to its controller

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/projects', showProjectsPage);

router.get('/categories', showCategoriesPage);

// Route used to test the 500 error page

router.get('/test-error', testErrorPage);

// Route for organization details page

router.get('/organization/:id', showOrganizationDetailsPage);

// Route for project details page

router.get('/project/:id', showProjectDetailsPage);

// Route for category details page

router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page

router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission

router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route to display the edit organization form

router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission

router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// connects the new project URL to the showNewProject controller

router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission

router.post('/new-project', projectValidation, processNewProjectForm);

// Route to display the assign categories form

router.get('/assign-categories/:projectId', showAssignCategoriesForm);

// Route to process the assign categories form

router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route to display the edit project form

router.get('/edit-project/:id', showEditProjectForm);

// Route to process the edit project form

router.post('/edit-project/:id', processEditProjectForm);


export default router;