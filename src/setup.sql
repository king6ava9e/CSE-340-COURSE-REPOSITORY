CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


select * from organization;




INSERT INTO service_project
    (organization_id, title, description, location, date)
VALUES
    -- BrightFuture Builders
    (1, 'Park Cleanup', 'Clean and restore a local community park.', 'Kumasi Central Park', '2026-09-15'),
    (1, 'Community Centre Renovation', 'Help renovate and improve a community centre.', 'Adum Community Centre', '2026-09-20'),
    (1, 'Tree Planting Day', 'Plant trees to improve the local environment.', 'Kumasi Green Zone', '2026-09-25'),
    (1, 'School Building Support', 'Assist with improvements to a local school building.', 'Bantama Community School', '2026-10-02'),
    (1, 'Clean Water Project', 'Support efforts to improve access to clean water.', 'Ahodwo Community', '2026-10-10'),

    -- GreenHarvest Growers
    (2, 'Community Garden', 'Create and maintain a community vegetable garden.', 'Asokwa Community Garden', '2026-09-18'),
    (2, 'Urban Farming Workshop', 'Teach residents basic urban farming techniques.', 'Kumasi Community Hall', '2026-09-22'),
    (2, 'Food Sustainability Fair', 'Promote sustainable food production and healthy eating.', 'Kumasi Cultural Centre', '2026-09-28'),
    (2, 'Seed Distribution Drive', 'Distribute seeds to families interested in growing food.', 'Suame Community Centre', '2026-10-05'),
    (2, 'School Garden Project', 'Help students create and maintain a school garden.', 'Oforikrom Basic School', '2026-10-12'),

    -- UnityServe Volunteers
    (3, 'Food Drive', 'Collect and distribute food to families in need.', 'Kumasi Central', '2026-09-17'),
    (3, 'Community Tutoring', 'Provide educational support to local students.', 'Bantama Library', '2026-09-24'),
    (3, 'Elderly Support Day', 'Provide assistance and companionship to elderly community members.', 'Kumasi Senior Centre', '2026-10-01'),
    (3, 'Clothing Donation Drive', 'Collect and distribute clothing to people in need.', 'Adum Community Centre', '2026-10-08'),
    (3, 'Volunteer Outreach Day', 'Connect volunteers with local community service opportunities.', 'Kumasi City Centre', '2026-10-15');

	SELECT * FROM service_project;


    CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_project(project_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);


INSERT INTO category (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service');


    INSERT INTO project_category (project_id, category_id)
VALUES
    (1, 1),
    (1, 3),
    (2, 3),
    (3, 1),
    (4, 2),
    (4, 3),
    (5, 1),
    (5, 3),
    (6, 1),
    (6, 3),
    (7, 1),
    (7, 2),
    (8, 1),
    (8, 2),
    (9, 1),
    (10, 1),
    (10, 2),
    (11, 3),
    (12, 2),
    (12, 3),
    (13, 3),
    (14, 3),
    (15, 2),
    (15, 3);

	SELECT * FROM project_category;