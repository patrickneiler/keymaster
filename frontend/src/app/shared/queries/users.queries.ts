import gql from "graphql-tag";

// VARIABLES //
/** id: number */
export const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      name
      id
    }
  }
`;

export const GET_USERS_QUERY = gql`
  {
    users {
      id
      username
      firstName
      lastName
      groups {
        name
        id
      }
    }
  }
`;
