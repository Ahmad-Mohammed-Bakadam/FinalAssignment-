import React, { Component } from "react";
import "./BookmarkApp.css";

const apiUrl = "http://localhost:3000/api";

class BookmarkApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      newBookmark: { url: "", title: "" },
    };
  }

  componentDidMount() {
    this.readAllBookmarks();
  }

  addNewBookmark = async () => {
    const { newBookmark } = this.state;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    };
    await fetch(apiUrl + "/create.php", options);
    this.setState({
      newBookmark: { url: "", title: "" },
    });
    this.readAllBookmarks();
  };

  deleteBookmark = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };
    await fetch(apiUrl + "/delete.php", options);
    this.readAllBookmarks();
  };

  readAllBookmarks = async () => {
    try {
      const response = await fetch(apiUrl + "/readAll.php");
      const bookmarks = await response.json();
      this.setState({ bookmarks });
    } catch (e) {
      console.error(e);
    }
  };

  handleUrlChange = (e) => {
    const { newBookmark } = this.state;
    this.setState({
      newBookmark: { ...newBookmark, url: e.target.value },
    });
  };

  handleTitleChange = (e) => {
    const { newBookmark } = this.state;
    this.setState({
      newBookmark: { ...newBookmark, title: e.target.value },
    });
  };

  render() {
    const { bookmarks, newBookmark } = this.state;

    return (
      <div id="content">
        <div>
          <h1>Bookmarking App</h1>
          <input
            type="text"
            placeholder="Enter bookmark URL"
            value={newBookmark.url}
            onChange={this.handleUrlChange}
          />
          <input
            type="text"
            placeholder="Enter bookmark title"
            value={newBookmark.title}
            onChange={this.handleTitleChange}
          />
          <button onClick={this.addNewBookmark}>Add Bookmark</button>
        </div>
        <ul>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id}>
              <a href={bookmark.url} rel="noopener noreferrer">
                {bookmark.title}
              </a>
              <button onClick={() => this.deleteBookmark(bookmark.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookmarkApp;
