import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function AboutPage() {
  const [aboutText, setAboutText] = useState<string>(() => {
    const savedText = localStorage.getItem("aboutText");
    return (
      savedText ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state: unknown) => state.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutText(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("aboutText", aboutText);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Page
      </Typography>
      {user && user.userGroup === "Admin" ? (
        <>
          <TextField
            label="About Text"
            multiline
            rows={6}
            fullWidth
            
            variant="outlined"
            value={aboutText}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: 16 }}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <Typography>{aboutText}</Typography>
        </>
      )}
    </Container>
  );
}
