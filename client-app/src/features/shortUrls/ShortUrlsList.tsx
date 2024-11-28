import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShortUrls } from "../../app/redux/slices/shortUrlSlice";
import { ShortUrl } from "../../app/models/entities/shortUrl";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const ShortUrlsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector(
    (state: unknown) => state.shortUrls
  );
  const { user } = useSelector((state: unknown) => state.user);

  useEffect(() => {
    dispatch(fetchShortUrls());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Loading short URLs...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }
  const handleDetailsClick = (url: UrlData) => {
    console.log("Details for:", url);
    // You can implement your logic to show details here
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Original Urls</TableCell>
          <TableCell>Short Url</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {list.map((url: ShortUrl) => (
          <TableRow key={url.id}>
            <TableCell>{url.originalUrl}</TableCell>
            <TableCell>{url.urlKey}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDetailsClick(url)}
              >
                Details
              </Button>
              {url.userId === user.id && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEditClick(url)}
                >
                  Edit
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShortUrlsList;
