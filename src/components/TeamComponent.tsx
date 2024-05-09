import React from "react";
import { CaretRightFilled, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { TeamComponentProps } from "../types";

export const TeamComponent = ({ team }: TeamComponentProps) => {
	return (
		<div
			className="flex flex-col min-w-[18rem] w-[95%] py-6 px-4 rounded-3xl bg-gunmetal text-white hover:text-sandy hover:bg-gradient-to-t hover:from-persian hover:to-charcoal hover:scale-105 transition ease-in-out shadow-xl duration-500 cursor-default"
			key={team.id}
		>
			<div className="flex justify-between font-semibold">
				<p>{team.tipo.toUpperCase()}</p>
				<div className="flex gap-1">
					<p>{team.valoracion}</p>
					<StarFilled className="text-saffron" />
				</div>
			</div>
			<h2 className="text-2xl my-2 overflow-hidden text-ellipsis max-w-[250px] self-center">
				{team.nombre}
			</h2>

			<Link
				to={`team/${team.id}`}
				className="bg-night focus:bg-sandy hover:bg-sandy focus-within:bg-sandy focus-visible::bg-red-500 hover:text-night h-6 w-6 text-white rounded-full text-center self-end transition duration-300"
			>
				<CaretRightFilled />
			</Link>
		</div>
	);
};
