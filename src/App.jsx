// src/App.js
import React from "react";
import PhotoUpload from "./components/PhotoUpload";
import PhotoGallery from "./components/PhotoGallery";

const App = () => {
  return (
    <div>
      <h1>Photo Library</h1>
      <PhotoUpload />
      <PhotoGallery />
    </div>
  );
};

export default App;
