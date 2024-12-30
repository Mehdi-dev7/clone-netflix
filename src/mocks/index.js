import server from "./server";

export default process.env.NODE_ENV === "development" ? server : null;
