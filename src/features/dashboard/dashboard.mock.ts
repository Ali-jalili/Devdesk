/** @format */

export const dashboardStats = [
  {
    title: "Total Requests",
    value: 48,
    description: "API requests created",
  },
  {
    title: "Collections",
    value: 12,
    description: "Organized request groups",
  },
  {
    title: "Environments",
    value: 3,
    description: "Active environments",
  },
  {
    title: "API Calls",
    value: 256,
    description: "Total executions",
  },
];

export const workspaceSummary = {
  name: "DevDesk API",
  description: "Main backend workspace",
  collections: 12,
  requests: 48,
  environments: 3,
};

export const recentActivities = [
  {
    id: 1,
    type: "collection",
    title: "Created a new collection",
    description: "Authentication API",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "request",
    title: "Updated request",
    description: "Login endpoint",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "request",
    title: "Created new request",
    description: "Get users API",
    time: "Yesterday",
  },
];

export const quickActions = [
  {
    title: "Create Request",
    description: "Start a new API request",
    action: "create-request",
  },
  {
    title: "Create Collection",
    description: "Organize your requests",
    action: "create-collection",
  },
  {
    title: "Add Environment",
    description: "Manage API variables",
    action: "create-environment",
  },
];
