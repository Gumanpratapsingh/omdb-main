import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const fetchPublicId = async (playlistName) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/get-public-id-by-name/${encodeURIComponent(playlistName)}`);
        return response.data.publicId;
    } catch (error) {
        console.error('Failed to fetch public ID:', error);
        return null;
    }
};

export const PlaylistPage = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        console.log('Playlist ID:', playlistId);
        console.log('PlaylistPage component is rendering');
        axios.get(`https://omdb-back-16d7d1ff09bf.herokuapp.com/api/v1/playlists/${playlistId}`)
            .then(response => {
                console.log('Playlist data:', response.data);  // Log to check the data
                setPlaylist(response.data);
            })
            .catch(error => console.error('Failed to fetch playlist', error));
    }, [playlistId]);

    if (!playlist) return <div>Loading...</div>;

    const handleShare = async () => {
        console.log('handleShare called');
        console.log('Fetching public ID for:', playlist.name);  // Log to check the name being used
        const publicId = await fetchPublicId(playlist.name);
        if (!publicId) {
            alert('Failed to fetch public ID for sharing.');
            return;
        }
        const shareUrl = `${window.location.origin}/api/v1/user/share-playlist/${publicId}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share URL copied to clipboard!');
        });
    };

    return (
        <div>
            <h1>{playlist.name}</h1>
            <button onClick={handleShare}>Share this Playlist</button>
            {/* Render playlist details */}
        </div>
    );
};

