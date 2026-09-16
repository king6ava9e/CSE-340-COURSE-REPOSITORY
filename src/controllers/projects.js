// Get the projects from the database
import { getAllProjects } from '../models/projects.js';

// Display all service projects
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};

// Make the controller available to the routes
export { showProjectsPage };