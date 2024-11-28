import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createShortUrl } from "../../app/redux/slices/shortUrlSlice";
import { Box } from "@mui/material";

export default function CreateShortUrl() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    originalUrl: Yup.string().required("Original url can't be blank"),
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "top",
        minHeight: "100vh",
        marginTop: "100px",
      }}
    >
      <Formik
        initialValues={{ originalUrl: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(createShortUrl(values))
            .then(() => {
              navigate("/");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="originalUrl">URL</label>
              <Field name="originalUrl" />
              <ErrorMessage name="originalUrl" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
