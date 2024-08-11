import { Api } from ".";

export const getChannels = () => {
  return Api.get("/api/channels");
};
