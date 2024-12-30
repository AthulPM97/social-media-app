import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext";
import { useMutation, useQuery } from "@apollo/client";
import { FOLLOW_USER, GET_CURRENT_FOLLOWING } from "../../graphql/queries";

interface FeedContextType {
  userName: string | null;
  following: string[];
  followUser: (followUserName: string) => void;
  unfollowUser: (unfollowUserName: string) => void;
}

const defaultFeedCtxValue = {
  userName: null,
  following: [],
  followUser: () => {},
  unfollowUser: () => {},
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

  const { data: currentFollowingData, loading: loadingFollowing } = useQuery(
    GET_CURRENT_FOLLOWING,
    {
      variables: { currentUserName: userName },
      fetchPolicy: "cache-and-network",
    }
  );

  const [followUserMutation] = useMutation(FOLLOW_USER);

  useEffect(() => {
    if (currentFollowingData) {
      const currentFollowing =
        currentFollowingData.usersCollection.edges[0].node.following;
      setFollowing(currentFollowing);
    }
  }, [currentFollowingData]);

  const followUser = async (followUserName: string) => {
    const updatedFollowing = [...following, followUserName];
    try {
      await followUserMutation({
        variables: {
          currentUserName: userName,
          updatedFollowing,
        },
      });
      setFollowing(updatedFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (unfollowUserName: string) => {
    const updatedFollowing = following.filter(
      (user) => user !== unfollowUserName
    );

    try {
      await followUserMutation({
        variables: {
          currentUserName: userName,
          updatedFollowing,
        },
      });
      setFollowing(updatedFollowing);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (loadingFollowing) {
    return <div>Loading...</div>;
  }

  const value = {
    userName,
    following,
    followUser,
    unfollowUser,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
