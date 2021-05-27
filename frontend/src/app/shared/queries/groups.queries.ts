import gql from "graphql-tag";

// VARIABLES //
/** id: number */
export const GET_GROUP_QUERY = gql`
  query GetGroup($id: Int!) {
    group(id: $id) {
      name
      id
      users
    }
  }
`;

export const GET_GROUPS_QUERY = gql`
  {
    groups {
      name
      id
      users {
        username
        name
        id
        groups {
          name
          id
        }
      }
    }
  }
`;

export const ADD_USER_TO_GROUP_MUTATION = gql`
  mutation addUserToGroup($groupId: ID!, $userId: ID!) {
    addUserToGroup(groupId: $groupId, userId: $userId) {
      name
      id
      users {
        username
        name
        id
        groups {
          name
          id
        }
      }
    }
  }
`;

export const REMOVE_USER_FROM_GROUP_MUTATION = gql`
  mutation removeUserFromGroup($groupId: ID!, $userId: ID!) {
    removeUserFromGroup(groupId: $groupId, userId: $userId) {
      name
      id
      users {
        username
        name
        id
        groups {
          name
          id
        }
      }
    }
  }
`;
