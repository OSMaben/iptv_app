import axios from "axios";

export const Api = axios.create({
  baseURL: "https://iptv-laravel-bestfreeoffers-store.preview-domain.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
