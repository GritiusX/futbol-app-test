import React, { useState } from "react";
import { teamsController } from "../controllers/teamsControllers.ts";
import { useDispatch } from "react-redux";

export const FilterInputComponent = () => {
	const dispatch = useDispatch();
	const [inputFilterValue, setInputFilterValue] = useState<string>("");

	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
			e.preventDefault();
			teamsController.filterTeamsByValue(inputFilterValue, dispatch);
			setInputFilterValue("");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputFilterValue(e.target.value);
	};

	return (
		<input
			className="max-w-[450px] py-1 px-2 rounded-xl bg-gunmetal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite transition duration-300 ease-in-out"
			type="text"
			placeholder="Filtrar por Nombre"
			value={inputFilterValue}
			onChange={(e) => handleChange(e)}
			onKeyDown={handleKeyDown}
		/>
	);
};
