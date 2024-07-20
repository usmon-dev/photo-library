// src/components/PhotoGallery.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [blobUrls, setBlobUrls] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/photos`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (Array.isArray(response.data)) {
          setPhotos(response.data);
          response.data.forEach(photo => fetchImage(photo));
        } else {
          throw new Error("Response is not an array");
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(error.message);
      }
    };

    const fetchImage = async (photo) => {
        try {
          const response = await fetch(`${config.API_URL}${photo.url}`, {
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          });
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setBlobUrls(prev => ({ ...prev, [photo._id]: blobUrl }));
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

    fetchPhotos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(photos)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            width={300}
            src={blobUrls[photo._id]}
            alt={photo.caption}
          />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
