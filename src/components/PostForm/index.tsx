import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/queries";
import { uploadImage } from "../../supabase/uploadImage";
import { useFeed } from "../../contexts/feedContext";

const PostForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);

  const { userName } = useFeed();

  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: (data) => {
      console.log("Post created:", data);
      // Clear the form after successful post creation
      setDescription("");
      setImageFile(null);
      setTaggedUsers([]);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image and get URL
    let imageUrl: string | null = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    await createPost({
      variables: {
        userName,
        description,
        imageUrl,
        taggedUsers,
      },
    });

    // Close the modal
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(e.target.files ? e.target.files[0] : null)
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Tagged Users
        </label>
        <input
          type="text"
          value={taggedUsers.join(", ")}
          onChange={(e) =>
            setTaggedUsers(e.target.value.split(",").map((user) => user.trim()))
          }
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
      {error && <p className="mt-2 text-red-500">Error: {error.message}</p>}
    </form>
  );
};

export default PostForm;
