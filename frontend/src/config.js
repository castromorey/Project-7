export const API_ROOT =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://api.groupomania.ml";

export const UPLOADS_ROOT =
  window.location.hostname === "localhost"
    ? "http://localhost:3001/uploads/"
    : "https://api.groupomania.ml/uploads/";
