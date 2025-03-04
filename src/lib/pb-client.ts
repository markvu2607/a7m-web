import PocketBase from "pocketbase";

const pbClient = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export default pbClient;
