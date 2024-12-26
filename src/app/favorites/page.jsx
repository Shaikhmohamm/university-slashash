'use client';

import { useState, useEffect } from 'react';

// Assuming favorites are stored in localStorage or state
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount (or from your backend)
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Universities</h1>

      {favorites.length === 0 ? (
        <p className="text-lg">You don't have any favorites yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Country</th>
              <th className="border border-gray-300 p-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((university, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{university.name}</td>
                <td className="border border-gray-300 p-2">{university.country}</td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={university.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoritesPage;
