// En tu slice de Redux

import { createSlice } from "@reduxjs/toolkit";
import { StoreType, Team } from "../../../types";

const initialState: StoreType = {
	teams: [],
	selectedTeam: undefined,
	status: undefined,
	errorMsg: "",
	filteredTeams: [],
};

export const teamSlice = createSlice({
	name: "teamState",
	initialState,
	reducers: {
		setTeams: (state, action) => {
			state.teams = action.payload;
		},
		selectTeam: (state, action) => {
			const { teamId } = action.payload;
			state.selectedTeam = state.teams.find((team: Team) => team.id === teamId);
		},
		setFilteredTeams: (state, action) => {
			state.filteredTeams = action.payload;
		},
		updatePlayer: (state, action) => {
			const { teamId, playerId, descripcion, nombre, numero, posicion } =
				action.payload;
			const teamToUpdate = state.teams.find((team) => team.id === teamId);
			if (teamToUpdate) {
				const playerToUpdate = teamToUpdate.jugadores.find(
					(player) => player.numero === playerId
				);
				if (playerToUpdate) {
					playerToUpdate.nombre = nombre;
					playerToUpdate.numero = numero;
					playerToUpdate.posicion = posicion;
					playerToUpdate.descripcion = descripcion;
				}
			}
		},
	},
});

export const { setTeams, selectTeam, setFilteredTeams, updatePlayer } =
	teamSlice.actions;

export default teamSlice.reducer;
