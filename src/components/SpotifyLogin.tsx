import React from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = `${import.meta.env.VITE_BASE_URL}/callback`;
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
];

const SpotifyLogin: React.FC = () => {
  const login = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
      "%20"
    )}&response_type=code&show_dialog=true`;
  };

  return <button onClick={login}>Login Spotify</button>;
};

export default SpotifyLogin;
