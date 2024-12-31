import ProfileIcon from "../../assets/ProfileIcon";

export type PostType = {
  user_name: string;
  description: string;
  image_url: string;
  tagged_users: Array<string>;
  created_at: string;
};

const Post = ({ post }: { post: PostType }) => {
  const { user_name, description, image_url, tagged_users, created_at } = post;
  return (
    <div className="border rounded-lg my-3 bg-white">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="flex items-center w-full">
          <ProfileIcon />

          <p className="font-semibold text-sm ml-1">{user_name}</p>
        </div>
      </div>
      {/* Photo */}
      <div className="">
        <img src={image_url} alt="" />
      </div>

      <div className="m-3">
        {/* Caption */}
        <div className="flex  items-center mt-2">
          <p className="font-semibold mr-2 whitespace-nowrap">{user_name}</p>
          <p className="truncate">{description}</p>
        </div>
        {/* TimeStamp */}
        <p className="text-gray-400 text-xs my-2">
          {new Date(created_at).toLocaleString()}
        </p>
        {/* Border */}
        <div className="border-t -mx-3 my-3"></div>
        {/* Tagged users */}
        {tagged_users?.length > 0 && (
          <p className="text-gray-600 text-xs my-2">
            Tagged Users: {tagged_users.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Post;
