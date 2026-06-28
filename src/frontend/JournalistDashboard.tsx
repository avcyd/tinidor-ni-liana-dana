import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doOnAuthStateChange } from "../services/AuthService";
import { getUserById } from "../services/UserService";
import "./css/JournalistDashboard.css";
import { House, LayoutDashboard, Pencil, SquarePen } from "lucide-react";

function JournalistDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const stories = [
    {
      id: 1,
      title: "Turkey vs. USA Sports Lorem Ipsum Lorem Ipsum",
      excerpt:
        "Lorem Ipsum two countries fighting over sports i guess lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore..",
      lastUpdated: "28/6/26",
      status: "PUBLISHED",
    },
    {
      id: 2,
      title: "Turkey vs. USA Sports Lorem Ipsum Lorem Ipsum",
      excerpt:
        "Lorem Ipsum two countries fighting over sports i guess lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore..",
      lastUpdated: "28/6/26",
      status: "DRAFT",
    },
  ];

  useEffect(() => {
    const unsub = doOnAuthStateChange(async (user) => {
      if (!user) {
        setCurrentUser("");
        return;
      }
      const userData = await getUserById(user.uid);
      setCurrentUser(userData.displayName || "User");
    });
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  return (
    <div className="dashboard-page">
      <div>
        <p className="header-text">WebsiteName</p>
      </div>
      <div
        className={`dashboard-container ${isCollapsed ? "dashboard-container--collapsed" : ""}`}
      >
        <aside className="dashboard-panel dashboard-panel--sidebar">
          <div className="sidebar__header">
            <button
              className="sidebar__toggle"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "→" : "←"}
            </button>

            <span className="sidebar__welcome">
              Welcome, {currentUser || "..."}
            </span>
          </div>

          <nav className="sidebar__nav">
            <div className="nav-item">
              <span className="nav-item__icon">
                <LayoutDashboard color="#1E1E1E" strokeWidth={1.5} />
              </span>
              <span className="nav-item__text">{"Dashboard"}</span>
            </div>
            <div className="nav-item">
              <span className="nav-item__icon">
                <House color="#1E1E1E" strokeWidth={1.25} />
              </span>
              <span className="nav-item__text">Home</span>
            </div>
            <div className="nav-item">
              <span className="nav-item__icon">
                <Pencil color="#1E1E1E" strokeWidth={1.25} />
              </span>
              <span className="nav-item__text">Create</span>
            </div>
            <div className="nav-item">
              <span className="nav-item__icon">
                <SquarePen color="#1E1E1E" strokeWidth={1.25} />
              </span>
              <span className="nav-item__text">Drafts</span>
            </div>
          </nav>
        </aside>

        <main className="dashboard-panel dashboard-panel--main">
          <h2 className="feed-section-title">MOST RECENT</h2>

          <div className="stories-feed">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-card__content">
                  <h3 className="story-card__title">{story.title}</h3>
                  <p className="story-card__excerpt">{story.excerpt}</p>
                </div>

                <div className="story-card__meta">
                  <span className="story-card__date">
                    LAST UPDATED: {story.lastUpdated}
                  </span>
                  <span
                    className={`story-card__tag story-card__tag--${story.status.toLowerCase()}`}
                  >
                    {story.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default JournalistDashboard;
