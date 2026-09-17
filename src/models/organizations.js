import db from './db.js';

const getAllOrganizations = async () => {
    const query = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM public.organization;
`;
    
    const result = await db.query(query);
    return result.rows;
};

// export { getAllOrganizations };

// Get the details of one organization by its ID
const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM organization
        WHERE organization_id = $1;
    `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    // Return the organization if found, otherwise return null
    return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { getAllOrganizations, getOrganizationDetails };