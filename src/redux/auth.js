import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profileSave } from "./profile";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginInfo, thunkAPI) => {
    try {
      const { email, password } = loginInfo;
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        thunkAPI.dispatch(profileSave(data));
        return data;
      } else {
        // alert(data.message);
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (registerInfo, thunkAPI) => {
    console.log("in register async");
    try {
      const { name, email, password } = registerInfo;
      console.log("name is ", name);
      const response = await fetch("http://localhost:5000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data.message;
      } else {
        // alert("invalid password");
        // alert(data.message);
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const counterSlice = createSlice({
  name: "auth",
  initialState: {
    auth: false,
    status: "idle",
    message: "",
    isError: true,
  },
  reducers: {
    login: (state) => {
      state.message = "";
      state.auth = true;
    },
    logout: (state) => {
      state.message = "";
      state.auth = false;
    },
    register: (state) => {
      state.message = "";
      state.auth = undefined;
    },
    authMessage: (state, action) => {
      state.isError = true;
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    //loginCall
    builder
      .addCase(loginAsync.pending, (state) => {
        state.message = "";
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.auth = true;
        state.isError = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
        console.log("rejected payload is ", action.payload);
        state.status = "idle";
      });

    //registerCall
    builder
      .addCase(registerAsync.pending, (state) => {
        state.message = "";
        state.status = "loading";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload;
        state.isError = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "idle";
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { login, logout, register, authMessage } = counterSlice.actions;

export default counterSlice.reducer;
