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
import { NavLink } from "react-router-dom";

const ShortUrlsList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector(
    (state: unknown) => state.shortUrls
  );
  const { user } = useSelector((state: unknown) => state.user);

  useEffect(() => {
    dispatch(fetchShortUrls());
  }, [dispatch]);

  const handleDeleteClick = (id: string) => {
    console.log("Details for:", id);
    // Logic to Delete
  };

  if (status === "loading") {
    return <p>Loading short URLs...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

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
            <TableCell>
              <a
                href={`http://localhost:5000/${url.urlKey}`}
              >
                {`http://localhost:5000/${url.urlKey}`}
              </a>
            </TableCell>
            <TableCell>
              {user != null ? (
                <Button
                  variant="contained"
                  component={NavLink}
                  sx={{ marginRight: "5px" }}
                  to={`/details/${url.id}`}
                >
                  Details
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  component={NavLink}
                  sx={{ marginRight: "5px" }}
                  to={`/details/${url.id}`}
                >
                  Details
                </Button>
              )}

              {user != null &&
              (url.userId === user.id || user.userGroup === "Admin") ? (
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                  onClick={() => handleDeleteClick(url)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled
                  sx={{ backgroundColor: "red" }}
                  onClick={() => handleDeleteClick(url.id)}
                >
                  Delete
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
