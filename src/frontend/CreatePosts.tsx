import { useState, useEffect } from "react";

import { createPost } from "../services/ArticleService";
import { getCurrentUser, doOnAuthStateChange } from "../services/AuthService";

function CreatePosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const unsub = doOnAuthStateChange(() =>
      setCurrentUserId(getCurrentUser()?.uid || ""),
    );
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await createPost({
        creatorId: currentUserId,
        title: title,
        content: content,
        tags: tags,
      });
      console.log(`Success`);
      setTitle("");
      setContent("");
      setTags([]);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  return (
    <>
      <div>
        <h2>Create Post:</h2>
        <h3>
          Status:{" "}
          {(currentUserId && "Form Enabled") || "Not Logged in (Form Disabled)"}
        </h3>
        <section>
          <div className="form-input">
            <label>Title</label>
            <input
              disabled={currentUserId ? false : true}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>contents: </label>
            <textarea
              disabled={currentUserId ? false : true}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label>tags: </label>
            <input
              disabled={currentUserId ? false : true}
              type="text"
              value={tags}
              onChange={(e) =>
                setTags(
                  Array.from(
                    e.target.value.split(",").map((tag) => tag.trim()),
                  ),
                )
              }
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </section>
      </div>
    </>
  );
}
export default CreatePosts;
