'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${searchTerm}`
      );
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const addToFavorites = async (university) => {
    try {
      setFavorites((prevFavorites) => [...prevFavorites, university]);
      await axios.post('/api/favorites', university);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Search Universities</h1>

      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter university name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {universities.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Country</th>
              <th className="border border-gray-300 p-2">Website</th>
              <th className="border border-gray-300 p-2">Favorite</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university, index) => (
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
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => addToFavorites(university)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Favorite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Favorites</h2>
          <ul className="list-disc ml-5">
            {favorites.map((fav, index) => (
              <li key={index}>{fav.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
