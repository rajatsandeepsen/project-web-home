/* eslint-disable react/prop-types */
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";

const Widget = styled("div")(() => ({
  width: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

interface Track {
  name: string;
  album: {
    images: { url: string }[];
    name: string;
  };
  artists: { name: string }[];
  duration_ms: number;
  position_ms: number;
  is_playing: boolean;
}

interface MusicPlayerSliderProps {
  currentlyPlayingTrack: Track | null;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

export default function MusicPlayerSlider({
  currentlyPlayingTrack,
  onNextTrack,
  onPrevTrack,
}: MusicPlayerSliderProps) {
  const theme = useTheme();
  const [position, setPosition] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [deviceId, setDeviceId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (currentlyPlayingTrack) {
      setDuration(currentlyPlayingTrack.duration_ms / 1000);
      setPosition(currentlyPlayingTrack.position_ms / 1000 || 0);
      setPaused(currentlyPlayingTrack.is_playing);
    }
  }, [currentlyPlayingTrack]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!paused && position < duration) {
      timer = setInterval(() => {
        setPosition((prevPosition) => Math.min(prevPosition + 1, duration));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paused, position, duration]);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const mainIconColor = "#fff";

  const getAccessToken = React.useCallback(() => {
    return localStorage.getItem("access_token");
  }, []);

  const handlePlayPause = React.useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    const url = `https://api.spotify.com/v1/me/player/${
      paused ? "play" : "pause"
    }`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ device_id: deviceId }),
      });

      if (response.ok) {
        setPaused(!paused);
      } else {
        const errorData = await response.json();
        console.error("Failed to play/pause", errorData);
      }
    } catch (error) {
      console.error("Error during play/pause:", error);
    }
  }, [paused, deviceId, getAccessToken]);

  const handlePositionChange = React.useCallback(
    async (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) return; // For safety, handle only single value

      const token = getAccessToken();
      if (!token) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/seek?position_ms=${
            newValue * 1000
          }`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            ...(deviceId && { body: JSON.stringify({ device_id: deviceId }) }),
          }
        );

        if (response.ok) {
          setPosition(newValue);
        } else {
          console.error("Failed to seek");
        }
      } catch (error) {
        console.error("Error during seek:", error);
      }
    },
    [deviceId, getAccessToken]
  );

  React.useEffect(() => {
    const getDevices = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const activeDevice = data.devices.find(
          (device: { is_active: boolean; id: string }) => device.is_active
        );
        if (activeDevice) {
          setDeviceId(activeDevice.id);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    getDevices();
  }, [getAccessToken]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 10,
        width: "100%",
        overflow: "hidden",
        background: "#00000036",
        backdropFilter: "blur(20px)",
        padding: "12px",
        borderRadius: "15px",
      }}
    >
      {/* Track Info */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CoverImage>
          <img
            alt={currentlyPlayingTrack?.name || "Album cover"}
            src={
              currentlyPlayingTrack?.album.images[0]?.url || "default-image-url"
            }
          />
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {currentlyPlayingTrack?.name || "Unknown Track"}
          </Typography>
          <Typography noWrap>
            <b>{currentlyPlayingTrack?.artists[0]?.name || "Unknown Artist"}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
            {currentlyPlayingTrack?.album.name || "Unknown Album"}
          </Typography>
        </Box>
      </Box>
      <Widget>
        {/* Play/Pause button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={onPrevTrack}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={handlePlayPause}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={onNextTrack}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>

        {/* Time indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>

        {/* Slider  */}
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={handlePositionChange}
          sx={{
            color: "#fff",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
      </Widget>
    </Box>
  );
}
