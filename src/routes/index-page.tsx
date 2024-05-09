import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavbarComponent } from "../components/NavbarComponent.tsx";
import { useDispatch } from "react-redux";
import { teamsController } from "../controllers/teamsControllers.ts";
import { setTeams } from "../store/features/teams/teamSlice.ts";

export default function IndexPage() {
	const dispatch = useDispatch();

	const location = useLocation();

	const fetchData = useCallback(async () => {
		try {
			const teamsData = await teamsController.getGlobalTeams();
			dispatch(setTeams(teamsData));
			teamsController.saveTeamsToLocal(teamsData);
		} catch (error) {
			console.error("Error fetching global teams:", error);
		}
	}, [dispatch]);

	useEffect(() => {
		const localStorageTeams = teamsController.getTeamsFromLocal();
		dispatch(setTeams(localStorageTeams));

		if (localStorageTeams.length === 0 || !localStorageTeams) {
			fetchData();
		}
	}, [dispatch, fetchData, location.key]);

	return (
		<>
			<NavbarComponent />
			<article className="bg-night w-full">
				<Outlet />
			</article>
		</>
	);
}
