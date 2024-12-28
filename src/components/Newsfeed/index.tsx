import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import Post from "./post";

const NewsFeedComponent: React.FC = () => {
  // State to manage pagination
  const [limit] = useState(2); // Number of posts per request
  const [offset, setOffset] = useState(0); // Initial offset

  // Apollo Client query for posts
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit, offset },
    fetchPolicy: "cache-and-network", // To refetch and update the cache
  });

  // Handle loading state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Flatten the fetched data array
  const posts = data?.postsCollection?.edges?.map((edge: any) => edge.node);

  // Handle loading more posts
  const loadMorePosts = () => {
    setOffset((prev) => prev + limit);
    fetchMore({
      variables: {
        limit,
        offset: offset + limit,
      },
    });
  };

  return (
    <div>
      <h1>News Feed</h1>
      <div>
        {posts?.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={loadMorePosts}
          disabled={loading}
        >
          {loading ? "Loading more..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default NewsFeedComponent;
