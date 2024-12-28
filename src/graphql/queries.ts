import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($limit: Int, $offset: Int) {
    postsCollection(first: $limit, offset: $offset) {
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
