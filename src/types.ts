export type ErrorPageType = {
	statusText: string;
	message: string;
};

export type NavbarType = {
	name: string;
	path: string;
};

export type TeamsArray = Team[];

export type Team = {
	id: number | null;
	nombre: string;
	tipo: string;
	valoracion: number | null;
	jugadores: Player[];
};

export type Player = {
	numero: number | string;
	img: string;
	nombre: string;
	posicion: string;
	descripcion: string;
};

export type PlayerComponentProps = {
	className: string;
	player: Player;
};

export type TeamComponentProps = {
	team: Team;
};

export type StoreType = {
	teams: TeamsArray;
	selectedTeam: Team | undefined;
	status: 200 | 400 | undefined;
	errorMsg: string | undefined;
	filteredTeams: TeamsArray;
};
