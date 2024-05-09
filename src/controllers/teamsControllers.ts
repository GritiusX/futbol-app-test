import { Dispatch } from "redux";
import {
	setFilteredTeams,
	setTeams,
} from "../store/features/teams/teamSlice.ts";
import { Team, TeamsArray } from "../types.ts";

export class teamsController {
	static addNewTeam(newTeam: Team): void {
		const teams = this.getTeamsFromLocal();
		const updatedTeams = [...teams, newTeam];
		this.saveTeamsToLocal(updatedTeams);
	}

	static saveTeamsToLocal(teamsData: TeamsArray): void {
		localStorage.setItem("teams", JSON.stringify(teamsData));
	}
	static getTeamsFromLocal(): TeamsArray {
		const localStorageData = localStorage.getItem("teams");
		if (localStorageData === null || localStorageData === undefined) {
			return [];
		}

		try {
			const ParsedTeams: TeamsArray = JSON.parse(localStorageData);
			return Array.isArray(ParsedTeams) ? ParsedTeams : [];
		} catch (error) {
			console.error("Error parsing JSON:", error);
			return [];
		}
	}

	static deleteTeamFromLocal(teamId: number, dispatch: Dispatch<any>): void {
		const teams = this.getTeamsFromLocal();

		const updatedTeams = teams.filter((team) => team.id !== teamId);

		this.saveTeamsToLocal(updatedTeams);
		dispatch(setTeams(updatedTeams));
	}
	static async getGlobalTeams(): Promise<TeamsArray> {
		const response = await fetch("/api/hardCodedData.json");
		if (!response.ok) {
			throw new Error("Failed to fetch global teams");
		}
		const data = await response.json();
		return data.equipos as TeamsArray;
	}

	static filterTeamsByType(filterType: string, dispatch: Dispatch<any>) {
		const teams = this.getTeamsFromLocal();
		let filteredTeamsByType: Team[] = [];
		const filterTypeLower = filterType.toLowerCase();
		if (filterType) {
			filteredTeamsByType = teams.filter(
				(team) => team.tipo.toLowerCase() === filterTypeLower
			);
			dispatch(setFilteredTeams(filteredTeamsByType));
		}
	}

	static filterTeamsByValue(filterType: string, dispatch: Dispatch<any>) {
		const teams = this.getTeamsFromLocal();
		let filteredTeamsByValue: Team[] = [];
		const value = parseFloat(filterType);
		const isNumber = !isNaN(value);

		if (isNumber) {
			filteredTeamsByValue = teams.filter((team) =>
				team.valoracion?.toString().startsWith(value.toString())
			);
			dispatch(setFilteredTeams(filteredTeamsByValue));
		} else {
			filteredTeamsByValue = teams.filter((team) =>
				team.nombre.toLowerCase().includes(filterType.toLowerCase())
			);

			dispatch(setFilteredTeams(filteredTeamsByValue));
		}
	}
	static updateTeam(teamId: number, updatedTeam: Team): void {
		const teams = this.getTeamsFromLocal();
		const updatedTeams = teams.map((team) =>
			team.id === teamId ? { ...team, ...updatedTeam } : team
		);
		this.saveTeamsToLocal(updatedTeams);
	}
}
