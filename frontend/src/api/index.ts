import axios from "axios";
import config from "../config/config";

const abortController = new AbortController();

const API = axios.create({
  baseURL: config.API_URL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
  signal: abortController.signal,
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const refresh_token = user.refreshToken;
    const access_token = user.accessToken;

    config.headers.__refresh_token__ = `Bearer ${refresh_token}`;
    config.headers.__access_token__ = `Bearer ${access_token}`;
  }

  return config;
});

const cancelRequest = () => {
  abortController.abort();
};

const signup = async (data: SignupPayload) => {
  const resp = await API.post("/auth/signup", data);
  return resp.data.data;
};

const login = async (data: LoginPayload) => {
  const resp = await API.post("/auth/login", data);
  return resp.data.data;
};

const refreshTokens = async () => {
  const resp = await API.get("/auth/refresh");
  return resp.data.data;
};

const getAllUsers = async () => {
  const resp = await API.get("/users");
  return resp.data.data;
};

const getUser = async (id: User["id"]) => {
  const resp = await API.get(`/users/${id}`);
  return resp.data.data;
};

const getAllPosts = async () => {
  const resp = await API.get("/posts");
  return resp.data.data;
};

const getPost = async (id: Post["_id"]) => {
  const resp = await API.get(`/posts/${id}`);
  return resp.data.data;
};

const publishPost = async (data: CreatePostPayload) => {
  const resp = await API.post("/posts", data);
  return resp.data.data;
};

const updatePost = async (id: Post["_id"]) => {
  const resp = await API.patch(`/posts/${id}`);
  return resp.data.data;
};

const deletePost = async (id: Post["_id"]) => {
  const resp = await API.delete(`/posts/${id}`);
  return resp.data.data;
};

export {
  cancelRequest,
  signup,
  login,
  refreshTokens,
  getAllUsers,
  getUser,
  getAllPosts,
  getPost,
  publishPost,
  updatePost,
  deletePost,
};
