import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    usersCollection {
      edges {
        node {
          user_name
        }
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    postsCollection(
      first: $limit
      offset: $offset
      orderBy: { created_at: DescNullsFirst }
    ) {
      edges {
        node {
          id
          created_at
          user_name
          description
          image_url
          tagged_users
        }
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $userName: String!
    $description: String!
    $imageUrl: String
    $taggedUsers: [String!]
  ) {
    insertIntopostsCollection(
      objects: {
        user_name: $userName
        description: $description
        image_url: $imageUrl
        tagged_users: $taggedUsers
      }
    ) {
      records {
        id
        created_at
        user_name
        description
        image_url
        tagged_users
      }
    }
  }
`;

export const GET_CURRENT_FOLLOWING = gql`
  query GetCurrentFollowing($currentUserName: String!) {
    usersCollection(filter: { user_name: { eq: $currentUserName } }) {
      edges {
        node {
          following
        }
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($currentUserName: String!, $updatedFollowing: [String!]) {
    updateusersCollection(
      set: { following: $updatedFollowing }
      filter: { user_name: { eq: $currentUserName } }
      atMost: 1
    ) {
      records {
        user_name
        following
      }
    }
  }
`;
