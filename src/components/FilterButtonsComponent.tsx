import React from "react";
import { teamsController } from "../controllers/teamsControllers.ts";
import { useDispatch } from "react-redux";
import { RedoOutlined } from "@ant-design/icons";
import { setFilteredTeams } from "../store/features/teams/teamSlice.ts";

export const FilterButtonsComponent = () => {
	const dispatch = useDispatch();
	const handleFilterTypeChange = (type: string) => {
		teamsController.filterTeamsByType(type, dispatch);
	};
	const handleClearFilter = () => {
		dispatch(setFilteredTeams([]));
	};

	return (
		<div className="flex gap-4 ml-2 cursor-default">
			<span
				className="h-10 w-10 text-center justify-center items-center rounded-2xl p-2 bg-gunmetal text-dayWhite hover:bg-persian hover:scale-105 hover:text-night transition-all duration-300 cursor-pointer"
				onClick={() => handleFilterTypeChange("F5")}
			>
				F5
			</span>
			<span
				className="h-10 w-10 text-center justify-center items-center rounded-2xl p-2 bg-gunmetal text-dayWhite hover:bg-persian hover:scale-105 hover:text-night transition-all duration-300 cursor-pointer"
				onClick={() => handleFilterTypeChange("F7")}
			>
				F7
			</span>
			<span
				className="h-10 w-10 text-center justify-center items-center rounded-2xl p-2 bg-gunmetal text-dayWhite hover:bg-persian hover:scale-105 hover:text-night transition-all duration-300 cursor-pointer"
				onClick={() => handleFilterTypeChange("F11")}
			>
				F11
			</span>
			<span
				className="h-9 w-9 items-center self-center text-center pt-1 rounded-full bg-dayWhite text-gunmetal hover:bg-sandy hover:text-dayWhite hover:scale-105 transition-all duration-300 cursor-pointer"
				onClick={handleClearFilter}
			>
				<RedoOutlined />
			</span>
		</div>
	);
};
