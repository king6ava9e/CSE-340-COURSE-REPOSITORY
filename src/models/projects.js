import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.organization_id,
            service_project.title,
            service_project.description,
            service_project.location,
            service_project.date,
            organization.name AS organization_name
        FROM service_project
        JOIN organization
            ON service_project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

// export { getAllProjects };

// Get all projects belonging to a specific organization
const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};
// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };