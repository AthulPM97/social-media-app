import React from "react";
import Post from "./post";
import { useFeed } from "../../contexts/feedContext";
import SpinnyThing from "../../assets/SpinnyThing";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsFeedComponent: React.FC = () => {
  const { posts, loadMorePosts, noMorePosts, error } = useFeed();

  // Handle error
  if (error) return <p>Error: {error.message}</p>;

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={!noMorePosts}
      loader={<SpinnyThing />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {posts?.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default NewsFeedComponent;
