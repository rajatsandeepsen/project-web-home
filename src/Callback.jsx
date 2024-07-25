import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = "4613ad851712424d87c043c5b029da27"
const CLIENT_SECRET = "99661f511d374780a6447471f4ba13bf"
const REDIRECT_URI = "http://localhost:5173/callback"

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            exchangeCodeForToken(code);
        }
    }, []);

    async function exchangeCodeForToken(code) {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                }),
            });

            const data = await response.json();
            console.log("Token response:", data);  // Add this line
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                navigate('/');
            } else {
                console.error("No access token received");
            }
        } catch (error) {
            console.error("Error exchanging code for token:", error);
        }
    }

    return <div>Loading...</div>;
}

export default Callback;