import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TeamComponent } from "../components/TeamComponent.tsx";
import { Team, TeamsArray } from "../types.ts";

import { FilterButtonsComponent } from "../components/FilterButtonsComponent.tsx";
import { FilterInputComponent } from "../components/FilterInputComponent.tsx";

export default function HomePage() {
	const teams = useSelector(
		(state: any) => state.TeamState.teams
	) as TeamsArray;
	const filteredTeams = useSelector(
		(state: any) => state.TeamState.filteredTeams
	) as TeamsArray;

	useEffect(() => {
		console.log(teams);
		console.log("filteredTeams", filteredTeams);
	}, [teams, filteredTeams]);

	return (
		<>
			<section className="flex flex-col min-h-[calc(100vh-56px)] gap-4 px-6 pb-8 py-4">
				<div className="flex flex-col w-full gap-4 col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5">
					<div className="flex flex-col gap-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
						<FilterInputComponent />
						<FilterButtonsComponent />
					</div>
				</div>
				<section className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 items-center">
					{filteredTeams && filteredTeams.length > 0 ? (
						filteredTeams.map((team: Team) => (
							<TeamComponent key={team.id} team={team} />
						))
					) : teams && teams.length > 0 ? (
						teams.map((team: Team) => (
							<TeamComponent key={team.id} team={team} />
						))
					) : (
						<h2>No hay equipos disponibles</h2>
					)}
				</section>
			</section>
		</>
	);
}
