// src/components/PhotoUpload.js
import React, { useState } from "react";
import axios from "axios";
import { config } from "../config";

const PhotoUpload = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("caption", caption);

    try {
      const response = await axios.post(`${config.API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'ngrok-skip-browser-warning': 'true'
        },
      }).then(() => {
        window.location.reload()
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handlePhotoChange} />
      <input
        type="text"
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Caption"
      />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default PhotoUpload;
