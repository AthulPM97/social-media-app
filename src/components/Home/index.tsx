import NewsFeedComponent from "../Newsfeed";

const Home = () => {
  return (
    <div className="bg-gray-background">
      <div className="grid grid-cols-2 gap-4 justify-between mx-auto max-w-screen-lg">
        <NewsFeedComponent />
      </div>
    </div>
  );
};

export default Home;
