import React, { Fragment, useRef, useCallback } from "react";
import "./dragAndDrop.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import Themplates from "../theme";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

const theme = createTheme(Themplates);

const useStyles = makeStyles(() => ({
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    address: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgb(99, 115, 129)",
    backgroundColor: "rgb(244, 246, 248)",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  placeholderImageProfile: {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgba(22, 28, 36, .50)",
  },
  placeholderLabel: {
    color: "rgb(255, 255, 255)",
  },
}));

const DragAndDrop = (props) => {
  const { setFiles, files } = props;
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    let formData = new FormData();
    acceptedFiles.map((file) => formData.append("image", file));
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    // setUploads(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    maxFiles: 1,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box>
          <Box {...getRootProps({ className: "dropzone" })}>
            <Box className="inner-dropzone">
              <input {...getInputProps()} />
              <div
                className={`placeholder ${classes.placeholder} ${
                  files.length != 0 && classes.placeholderImageProfile
                }`}
              >
                <AddAPhoto />
                <Typography
                  style={{
                    marginTop: 8,
                    backgroundColor: "transparent",
                  }}
                  className={`${files != 0 && classes.placeholderLabel}`}
                  variant="body2"
                >
                  Upload Photo
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default DragAndDrop;
