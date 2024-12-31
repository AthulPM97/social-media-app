import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@headlessui/react";
import { GET_USERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useFeed } from "../../contexts/feedContext";
import FollowIcon from "../../assets/FollowIcon";

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { following, followUser, unfollowUser } = useFeed();

  const { data } = useQuery(GET_USERS, {
    fetchPolicy: "cache-and-network",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Fetch suggestions based on the value
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (query: string) => {
    const allSuggestions = data.usersCollection.edges.map(
      (edge: any) => edge.node.user_name
    );
    const filteredSuggestions = allSuggestions.filter((item: string) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="basis-1/2 hidden md:block">
      <div className="relative">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-3 text-gray-300"
        />
        <input
          id="search"
          className="p-2 bg-gray-100 rounded-lg w-80 pl-10 align-middle focus:outline-0 placeholder:font-light"
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-200 rounded-lg w-80 mt-2 max-h-48 overflow-y-auto shadow-lg z-10">
            {suggestions.map((suggestion, index) => {
              const isFollowing = following.includes(suggestion);
              return (
                <li
                  key={index}
                  className="p-2 flex justify-between items-center"
                  onClick={() => setSearchTerm(suggestion)}
                >
                  {suggestion}
                  <Button
                    className={`inline-flex items-center gap-2 rounded-md bg-gray-100 py-1.5 px-3 text-sm/6 font-semibold text-black hover:text-white shadow-inner shadow-white/10 focus:outline-none ${
                      isFollowing
                        ? "data-[hover]:bg-gray-600"
                        : "data-[hover]:bg-gray-600"
                    }`}
                    onClick={() =>
                      isFollowing
                        ? unfollowUser(suggestion)
                        : followUser(suggestion)
                    }
                  >
                    {isFollowing ? (
                      "Following"
                    ) : (
                      <>
                        Follow <FollowIcon />
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
