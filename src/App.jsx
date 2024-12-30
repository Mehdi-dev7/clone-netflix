import * as React from "react";
import "./mocks";
import * as authNetflix from "./utils/authNetflixProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthApp } from "./AuthApp"
import { UnauthApp } from "./UnauthApp";

const theme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#E50914",
		},
		secondary: {
			main: "#E50914",
		},
	},
});

function App() {
	const [authUser, setAuthUser] = React.useState(null);

	const login = (data) => {
		authNetflix
			.login(data)
			.then((user) => setAuthUser(user))
			.catch((err) => console.error(err));
	};

	const register = (data) => {
		authNetflix
			.register(data)
			.then((user) => setAuthUser(user))
			.catch((err) => console.error(err));
	};

	const logout = () => {
		authNetflix.logout();
		setAuthUser(null);
	};

	return (
		<ThemeProvider theme={theme}>
			{authUser ? (
				<AuthApp logout={logout} />
			) : (
				<UnauthApp login={login} register={register} />
			)}

			<AuthApp />
		</ThemeProvider>
	);
}

export { App };
