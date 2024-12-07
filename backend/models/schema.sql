CREATE TABLE IF NOT EXISTS laptops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    serialNumber TEXT UNIQUE,
    status TEXT CHECK(status IN ('available', 'assigned', 'maintenance')),
    purchaseDate TEXT
);

CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    department TEXT
);

CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    laptopId INTEGER,
    employeeId INTEGER,
    assignedAt TEXT,
    returnedAt TEXT,
    FOREIGN KEY (laptopId) REFERENCES laptops (id),
    FOREIGN KEY (employeeId) REFERENCES employees (id)
);

CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    laptopId INTEGER,
    description TEXT,
    status TEXT,
    cost REAL,
    loggedAt TEXT,
    FOREIGN KEY (laptopId) REFERENCES laptops (id)
);

CREATE TABLE IF NOT EXISTS issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    laptopId INTEGER,
    description TEXT,
    priority TEXT,
    status TEXT,
    reportedBy TEXT,
    reportedAt TEXT,
    FOREIGN KEY (laptopId) REFERENCES laptops (id)
);
