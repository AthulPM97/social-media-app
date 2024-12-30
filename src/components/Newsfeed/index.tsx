import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../graphql/queries";
import Post, { PostType } from "./post";
import { useFeed } from "../../contexts/feedContext";

const NewsFeedComponent: React.FC = () => {
  // State to manage pagination
  const [limit] = useState(2); // Number of posts per request
  const [offset, setOffset] = useState(0); // Initial offset
  const [posts, setPosts] = useState<PostType[]>([]); // State to store posts

  const { following } = useFeed();

  // Apollo Client query for posts
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit, offset, userNames: following },
    fetchPolicy: "cache-and-network", // To refetch and update the cache
  });

  // Handle loading more posts
  const loadMorePosts = () => {
    setOffset((prev) => prev + limit);
    fetchMore({
      variables: {
        limit,
      },
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      loadMorePosts();
    }
  };

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => [
        ...prevPosts,
        ...data.postsCollection.edges.map((edge: any) => edge.node),
      ]);
    }
  }, [data]);

  // scorll event listener
  useEffect(() => {
    setPosts([]);
    setOffset(0);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle error
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        {posts?.map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default NewsFeedComponent;
