import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Card } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import {
  setLocalAccessToken,
  setLocalRefreshToken,
} from "../../common/localStorage/local.storege";
import { authService } from "../../services/auth.service";
import { userActions, userThunks } from "../../store/slices";
import { useAppDispatch } from "../../store/store";
import s from "./loginComponent.module.css";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to={""}>Your Website</Link> {new Date().getFullYear()}
    </Typography>
  );
}

const Schema = z.object({
  password: z.string().min(1),
  email: z.string().email(),
});

export type FormType = z.infer<typeof Schema>;

type SignType = {
  callback?: () => void;
  closeModal?: () => void | undefined;
};

export const SignIn: React.FC<SignType> = ({ callback, closeModal }) => {
  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(Schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormType) => {
    authService
      .login(data)
      .then((r) => {
        setLocalAccessToken(r?.data?.tokens.accessToken);
        setLocalRefreshToken(r?.data?.tokens.refreshToken);
        dispatch(userActions.setCurrenUser(r.data.user));
        dispatch(userThunks.fetchGoods());
        toast.info(`Welcome ${r?.data?.user.name} in our platform!`, {
          position: "top-right",
          theme: "colored",
          type: "success",
        });

        if (closeModal !== undefined) {
          closeModal();
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(`${e.response?.data.messages}`, {
          position: "top-right",
          theme: "colored",
          type: "error",
        });
      });
  };

  const onSuccess = async (response: any) => {
    try {
      const data = await authService.loginByGoogle(
        response.clientId,
        response.credential,
      );
      dispatch(userThunks.fetchGoods());
      setLocalAccessToken(data?.data?.tokens.accessToken);
      setLocalRefreshToken(data?.data?.tokens.refreshToken);
      dispatch(userActions.setCurrenUser(data.data.user));
      toast.info(`Welcome ${data?.data?.user.name} in our platform!`, {
        position: "top-right",
        theme: "colored",
        type: "success",
      });
      if (closeModal !== undefined) {
        closeModal();
      }
    } catch (e: any) {
      toast.error(`${e.response?.data.messages}`, {
        position: "top-right",
        theme: "colored",
        type: "error",
      });
    }
  };

  return (
    <Container component="small" maxWidth="xs">
      <Card className={s.container} variant={"outlined"}>
        <CssBaseline />
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            {...register("email")}
            margin="normal"
            required
            fullWidth
            defaultValue={"12@gmail.com"}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={errors.email?.message}
            error={!!errors.email?.message}
          />
          <TextField
            {...register("password")}
            margin="normal"
            fullWidth
            helperText={errors.password?.message}
            error={!!errors.password?.message}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"forgot_password"} onClick={callback}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"create"} onClick={callback}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <GoogleLogin
            width={"100%"}
            onSuccess={onSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Box>
      </Card>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
