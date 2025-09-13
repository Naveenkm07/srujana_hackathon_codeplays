// Demo data for testing without Firebase
export const mockUsers = [
  {
    uid: "admin-1",
    name: "Admin User", 
    email: "admin@windsurf.com",
    provider: "password",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 7 },
    lastLogin: { seconds: Date.now() / 1000 - 3600 }
  },
  {
    uid: "user-1",
    name: "John Smith",
    email: "john@example.com", 
    provider: "google.com",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 3 },
    lastLogin: { seconds: Date.now() / 1000 - 1800 }
  },
  {
    uid: "user-2", 
    name: "Sarah Johnson",
    email: "sarah@test.com",
    provider: "password",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 5 },
    lastLogin: { seconds: Date.now() / 1000 - 7200 }
  },
  {
    uid: "user-3",
    name: "Mike Davis", 
    email: "mike.davis@gmail.com",
    provider: "google.com", 
    createdAt: { seconds: Date.now() / 1000 - 86400 * 10 },
    lastLogin: { seconds: Date.now() / 1000 - 14400 }
  }
];

export const mockAdmins = ["admin-1"];

// Local storage helpers
export function getLocalUsers() {
  const stored = localStorage.getItem('windsurf-users');
  return stored ? JSON.parse(stored) : mockUsers;
}

export function getLocalAdmins() {
  const stored = localStorage.getItem('windsurf-admins');
  return stored ? JSON.parse(stored) : mockAdmins;
}

export function saveLocalUsers(users) {
  localStorage.setItem('windsurf-users', JSON.stringify(users));
}

export function saveLocalAdmins(admins) {
  localStorage.setItem('windsurf-admins', JSON.stringify(admins));
}
