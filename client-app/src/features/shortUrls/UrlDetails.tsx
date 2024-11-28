import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchShortUrlDetails } from "../../app/redux/slices/shortUrlSlice";
import { Box, Typography } from "@mui/material";

export default function UrlDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    dispatch(fetchShortUrlDetails(id));
  }, [dispatch, id]);

  const selectedShortUrl = useSelector(
    (state: unknown) => state.shortUrls.selectedShortUrl
  );
  if (!selectedShortUrl) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          URL Details
        </Typography>
        <Typography variant="body1">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Details
      </Typography>
      <Typography variant="h6">Short URL:</Typography>
      <Typography variant="body1">{selectedShortUrl.urlKey}</Typography>
      <Typography variant="h6" mt={2}>
        Original URL:
      </Typography>
      <Typography variant="body1">{selectedShortUrl.originalUrl}</Typography>
      <Typography variant="h6" mt={2}>
        Created At:
      </Typography>
      <Typography variant="body1">
        {new Date(selectedShortUrl.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
}
