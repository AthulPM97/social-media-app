import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { useMutation, useQuery } from "@apollo/client";
import {
  FOLLOW_USER,
  GET_CURRENT_FOLLOWING,
  GET_POSTS,
} from "../../graphql/queries";
import SpinnyThing from "../../assets/SpinnyThing";
import { PostType } from "../../components/Newsfeed/post";

interface FeedContextType {
  userName: string | null;
  following: string[];
  followUser: (followUserName: string) => void;
  unfollowUser: (unfollowUserName: string) => void;
  posts: PostType[];
  loadMorePosts: () => void;
  noMorePosts: boolean;
  loading: boolean;
  error: any;
}

const defaultFeedCtxValue = {
  userName: null,
  following: [],
  followUser: () => {},
  unfollowUser: () => {},
  posts: [],
  loadMorePosts: () => {},
  noMorePosts: false,
  loading: false,
  error: null,
};

const FeedContext = React.createContext<FeedContextType>(defaultFeedCtxValue);

export function useFeed() {
  return useContext(FeedContext);
}

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const authCtx = useAuth();
  const userName = authCtx?.currentUser?.email
    ? authCtx?.currentUser?.email.split("@")[0]
    : null;

  const [following, setFollowing] = useState<string[]>([]);
  const [limit] = useState(2); // Number of posts per request
  const [offset, setOffset] = useState(0); // Initial offset
  const [posts, setPosts] = useState<PostType[]>([]); // State to store posts
  const [noMorePosts, setNoMorePosts] = useState(false); // State to track if there are more posts

  const { data: currentFollowingData, loading: loadingFollowing } = useQuery(
    GET_CURRENT_FOLLOWING,
    {
      variables: { currentUserName: userName },
      fetchPolicy: "cache-and-network",
    }
  );

  // Apollo Client query for posts
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { limit, offset, userNames: following },
    fetchPolicy: "cache-and-network", // To refetch and update the cache
  });

  const [followUserMutation] = useMutation(FOLLOW_USER);

  useEffect(() => {
    if (currentFollowingData) {
      const currentFollowing =
        currentFollowingData?.usersCollection?.edges[0]?.node?.following || [];
      setFollowing(currentFollowing);
    }
  }, [currentFollowingData]);

  useEffect(() => {
    if (data) {
      const newPosts = data.postsCollection.edges.map((edge: any) => edge.node);
      if (newPosts.length < limit) {
        setNoMorePosts(true); // No more posts to load
      } else {
        setNoMorePosts(false); // Reset if more posts can be loaded
      }
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }
  }, [data, following]);

  const loadMorePosts = () => {
    if (noMorePosts) return; // Do nothing if no more posts to load
    setOffset((prev) => prev + limit);
    fetchMore({
      variables: {
        limit,
        offset: offset + limit,
        userNames: following,
      },
    });
  };

  const followUser = async (followUserName: string) => {
    const updatedFollowing = [...following, followUserName];
    try {
      setOffset(0);
      await followUserMutation({
        variables: {
          currentUserName: userName,
          updatedFollowing,
        },
      });
      setFollowing(updatedFollowing);
      window.location.reload();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (unfollowUserName: string) => {
    const updatedFollowing = following.filter(
      (user) => user !== unfollowUserName
    );
    setOffset(0);
    try {
      await followUserMutation({
        variables: {
          currentUserName: userName,
          updatedFollowing,
        },
      });
      setFollowing(updatedFollowing);
      window.location.reload();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loadingFollowing) {
    return <SpinnyThing />;
  }

  const value = {
    userName,
    following,
    followUser,
    unfollowUser,
    posts,
    loadMorePosts,
    noMorePosts,
    loading,
    error,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
