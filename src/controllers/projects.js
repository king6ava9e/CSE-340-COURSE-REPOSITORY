// Get the projects from the database

import {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    getProjectsByVolunteerId
} from '../models/projects.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

import { getCategoriesByProjectId } from '../models/categories.js';

import { body, validationResult } from 'express-validator';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Display all upcoming service projects
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Display the details of one service project
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);

    const isLoggedIn = Boolean(req.session.user);
    let isVolunteer = false;

    if (isLoggedIn) {
        const volunteeredProjects = await getProjectsByVolunteerId(
            req.session.user.user_id
        );

        isVolunteer = volunteeredProjects.some(
            project => Number(project.project_id) === Number(projectId)
        );
    }

    const title = 'Project Details';

    res.render('project', {
        title,
        projectDetails,
        categories,
        isLoggedIn,
        isVolunteer,
        user: req.session.user
    });
};

// Display the new service project form
const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Create New Service Project';

    res.render('new-project', { title, organizations });
};

// Process the new service project form
const processNewProjectForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const organizations = await getAllOrganizations();
        const title = 'Create New Service Project';

        return res.render('new-project', {
            title,
            organizations,
            errors: errors.array(),
            data: req.body
        });
    }

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    const newProjectId = await createProject(
        title,
        description,
        location,
        date,
        organizationId
    );

    req.flash('success', 'Service project created successfully!');

    res.redirect(`/project/${newProjectId}`);
};

// Display the edit service project form
const showEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    const title = 'Edit Service Project';

    res.render('edit-project', {
        title,
        projectDetails,
        organizations
    });
};

// Process the edit service project form
const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;

    const {
        title,
        description,
        location,
        date,
        organizationId
    } = req.body;

    await updateProject(
        projectId,
        title,
        description,
        location,
        date,
        organizationId
    );

    req.flash('success', 'Service project updated successfully!');

    res.redirect(`/project/${projectId}`);
};

// Validation rules for new service projects
const projectValidation = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters.'),

    body('description')
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters.'),

    body('location')
        .trim()
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters.'),

    body('date')
        .isISO8601()
        .withMessage('Please enter a valid date.'),

    body('organizationId')
        .notEmpty()
        .withMessage('Please select an organization.')
];

/**
 * Process a user's volunteer signup for a service project
 */
const processVolunteerSignup = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    await addVolunteer(userId, projectId);

    req.flash('success', 'You have successfully signed up to volunteer!');

    res.redirect(`/project/${projectId}`);
};

/**
 * Process a user's volunteer withdrawal from a service project
 */
const processVolunteerWithdrawal = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.params.id;

    await removeVolunteer(userId, projectId);

    req.flash('success', 'You have withdrawn your volunteer signup.');

    res.redirect(`/project/${projectId}`);
};

// Export the controller functions
export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    processVolunteerSignup,
    processVolunteerWithdrawal,
    projectValidation
};