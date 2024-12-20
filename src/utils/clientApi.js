import axios from "axios";
import { apiKey, lang, API_URL } from "../config";

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

const clientApi = async (endpoint) => {
	const page = 1;
	await sleep(1000);
	const startChar = endpoint.includes("?") ? `&` : `?`;
	const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`;
	return axios.get(`${API_URL}/${endpoint}${keyLang}`);
};

export { clientApi };
