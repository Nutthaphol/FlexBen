import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { red } from "@mui/material/colors";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { login } from "../../actions/auth";

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  rootCard: {
    width: 345,
    marginTop: 100,
  },
  media: {
    height: 85,
    padding: 20,
    paddingBottom: 0,
    margin: 10,
  },
  version: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  showPassword: {
    position: "absolute",
    justifyContent: "center",
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Contain at least 8 characters";
  }

  return errors;
};

const PasswordField = ({ isSubmitting, values, handleChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl
      variant="outlined"
      style={{ width: "100%", marginTop: 8 }}
      error={error}
      fullWidth
      margin="normal"
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        disabled={isSubmitting}
        label="Password"
        name="password"
        id="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const LoginButton = withStyles(() => ({
  root: {
    marginTop: 10,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

const LoginPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    //anyNameFunction();
  }, []);

  const showForm = ({
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    handleClickShowPassword,
    handleMouseDownPassword,
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          name="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoFocus
          error={errors.username}
          disabled={isSubmitting}
        ></TextField>

        {errors.username && (
          <Typography style={{ color: "#f44336" }}>
            {errors.username}
          </Typography>
        )}
        <PasswordField
          isSubmitting={isSubmitting}
          values={values}
          handleChange={handleChange}
          name="password"
          error={errors.password}
        ></PasswordField>
        {errors.password && (
          <Typography style={{ color: "#f44336" }}>
            {errors.password}
          </Typography>
        )}
        <LoginButton
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          className={classes.submit}
        >
          {" "}
          {isSubmitting ? "Please wait..." : "Sign In"}
        </LoginButton>

        <Typography variant="body2" noWrap className={classes.version}>
          Version {process.env.REACT_APP_VERSION}
        </Typography>
      </form>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Card className={classes.rootCard}>
            <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
              image={`${process.env.PUBLIC_URL}/assets/LOGO SCG.png`}
            />
            <CardContent>
              <Typography variant="h4">Login</Typography>
              <Formik
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(login(values.username, values.password))
                    .then(() => {
                      props.history.push("/home");
                      window.location.reload();
                    })
                    .catch(() => {});
                }}
                initialValues={{
                  username: "",
                  password: "",
                  showPassword: false,
                }}
                validate={validate}
              >
                {(props) => showForm(props)}
              </Formik>
            </CardContent>
          </Card>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default LoginPage;
