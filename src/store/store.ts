import { configureStore } from "@reduxjs/toolkit";
import TeamState from "../store/features/teams/teamSlice.ts";

export default configureStore({
	reducer: {
		TeamState: TeamState,
	},
});
