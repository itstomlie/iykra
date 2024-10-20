\connect employees_db;

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  salary INTEGER NOT NULL   
);

INSERT INTO employees (name, position, salary) VALUES
  ('John Doe', 'Software Engineer', 80000),
  ('Jane Smith', 'Data Scientist', 95000),
  ('Alice Johnson', 'Project Manager', 100000),
  ('Bob Brown', 'UX/UI Designer', 70000),
  ('Charlie Davis', 'Product Manager', 90000);