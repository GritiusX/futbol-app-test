import TeamPage from "./routes/team-page.tsx";
import HomePage from "./routes/home-page.tsx";
import ErrorPage from "./routes/error-page.tsx";
import IndexPage from "./routes/index-page.tsx";
import NewTeamPage from "./routes/newTeam-page.tsx";

export const routes = [
	{
		path: "/",
		element: <IndexPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "",
				element: <HomePage />,
			},
			{
				path: "team/create",
				element: <NewTeamPage />,
			},
			{
				path: "team/create/:teamId", //si enviamos parametro es para Editar el equipo, pero usamos la misma page
				element: <NewTeamPage />,
			},
			{
				path: "team/:teamId",
				element: <TeamPage />,
			},
		],
	},
];
