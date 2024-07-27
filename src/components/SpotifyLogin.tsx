import React from "react";

const CLIENT_ID = "4613ad851712424d87c043c5b029da27";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost:5173/callback";
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
