# Keymaster 

Keymaster is the result of a technical assessment exercise with the purpose of writing code in a format resembling work on the job. There are base functional requirements, but beyond that the project was open-ended.

TABLE OF CONTENTS
1. [`Requirements`](##Requirements)
2. [`Solution`](##Solution)
3. [`Installation`](##Installation)
4. [`Stack`](##Stack)

## Requirements

Implement a user management application where users can be added to and removed from groups.

Time budget: 6-8 hrs

### Backend

The backend is pre-configured with all the models and APIs needed to build the frontend. There are no additional requirements and authentication is not needed.

### Frontend

The Material UI library is installed, and it is recommended to take advantage of the included components.

General Rules
- Use strict typing with Typescript (no `any`, etc.), the compiler is set to enforce that
- Apply component hierarchy principles and communication patterns
- Do not add extra dependencies

Use cases
- List all user groups
- List all users in the group when a group is selected
- Add / remove users to the selected group

## Solution

### Overview
Keymaster is an online game where people are placed into groups. Everyday, a member of the group is designated as the “Gatekeeper”. A key is awarded to the first member of the group that correctly guesses who the Gatekeeper is. The group member that holds the most keys is given the title of “Keymaster.”

### Implementation
The app is built using an Angular front-end and GraphQL back-end. The primary focus was building the UI as a reusable component library.
Hexatomic Component Library

#### Key aspects of the Hexatomic Component Library:
* Utilizes Atomic Design principles to set a structured hierarchy for the components based
on complexity.
* Although the app leverages the Angular Material library, Hexatomic component
containers reduce strict adherence to third-party libraries.
* Provides the possibility to dynamically render pages in the app using configuration,
which cuts down on hard-coded pages within the application.
* All components are abstracted and application-agnostic. Inputs and outputs are provided
to the consuming application.

#### Currently Implemented
The current state provides the following functionality:
- List view of users
    - User list items contain avatar image and username
    - Users can be dragged into groups
- List view of groups
    - Preview of group members
    - Accordian style expansion to view member list
    - Users can be removed from the groups
- Loading placeholders for user and group lists
- Success/Failure notifications for user actions

#### Application Structure
- Pages
    - Admin
- Shared
    - Queries
        - Exported constants of GraphQL queries and mutations
    - Services
        - Group & User services that return observables of list data
    - States
        - Exported interfaces for GraphQL entity models
    - Hexatomic
        - Templates
            - Admin
        - Organisms
            - Drag &amp; Drop
        - Molecules
            - Notification Service (Incomplete)
        - Atoms
            - Logo (Static)
            - Progress Spinner
            - Theme

### Roadmap
Given the time constraint, the primary focus was demonstrating the core principles of the application UI. If production were to continue, priorities would be placed as followed:

#### Critical
- Unit, functional and integration testing on all components
- Move the shared library outside of application and added as a dependency

#### High
- Move state management to NGRX datastore
- Componentize all currently implemented features:
    - List Component
    - List Item Component
    - Avatar Component
    - Notification Service
- Responsive support for all components

#### Medium
- Consider utilizing an NX Workspace multi-application monorepo to increase scalability of components and services
- Consider building application in Ionic Angular to take advantage of multi-platform builds and native mobile features
- Clean up and organize CSS

#### Low
○ Extend back-end to make the Keymaster game actually work :-)

## Installation

Requirements
* Docker 18.09+ & Docker Compose
* Node 12.13.0

## Startup

### Build / start Django and Postgres containers
`docker-compose up`

### Start Angular server
`cd frontend`
`npm install`
`npm start`

### URLs

Angular Application: http://localhost:4200/
<br>
Django admin site: http://localhost:8000/admin
<br>
GraphiQL: http://localhost:8000/graphql

## Stack

### Django

This project contains a Django backend that exposes a GraphQL endpoint to edit users and the groups they belong to.

There is also a standard Django admin interface that lets you interact directly with the objects in the database.

There is one default superuser account:
- Username: admin
- Password: supersecret

All other pre-installed user accounts (see `initial_data.json`):
- Password: supersecret

### GraphQL

GraphiQL is enabled to use to manually inspect the schema and execute queries and mutations against the backend. The following types exist (but use in GraphiQL to inspect the schema for the most up-to-date information):

```
User {
    id: int
    username: string (required)
    first_name: string
    last_name: string
    email: string
}

Group {
    id: int
    name: string
    users: List[User]
}

// Used only when creating or updating a user
UserInput {
    username: string (required)
    password: string (requirement depends on mutation)
    first_name: string
    last_name: string
    email: string
}
```

For users, the following queries and mutations are available:

```
Users() -> List[User]

User(id: int) -> User

// Requires the presence of the `password` field in the data parameter.
CreateUser(data: UserInput) -> User 

// The `password` field of the UpdateUser mutation is optional.
// If present, it will update the specified user's password.
UpdateUser(id: int, data: UserInput) -> User

DeleteUser(id: int) -> Void 
```

For groups, the following queries and mutations are available:

```
Groups() -> List[Group]

Group(id) -> Group

CreateGroup(data: GroupInput) -> Group

UpdateGroup(id: int, data: GroupInput) -> Group

RemoveGroup(id: int) -> Void

AddUserToGroup(groupId: int, userId: int) -> Group

RemoveUserFromGroup(groupId: int, userId: int) -> Group
```


