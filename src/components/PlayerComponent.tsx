import React from "react";
import { PlayerComponentProps } from "../types";

const PlayerComponent = ({ className, player }: PlayerComponentProps) => {
	return (
		<div
			className={`${className} flex flex-col items-center gap-3 w-full py-2 px-4 my-2  hover:bg-gradient-to-t hover:from-persian hover:to-charcoal hover:scale-105 transition ease-in-out duration-500 cursor-default`}
			key={player.numero}
		>
			<div className="flex items-center content-between place-content-between w-full justify-between">
				<img
					src={player.img ? player.img : "/assets/white-no_user_img.png"}
					className="w-10 h-10"
					alt="Player photograph"
				/>
				<p className="text-xl font-medium">{player.nombre}</p>
				<p className="bg-dayWhite text-gunmetal text-center rounded-full px-2 py-1">
					{player.numero && parseInt(player.numero.toString()) > 9
						? player.numero
						: `0${player.numero}`}
				</p>
			</div>

			<p>{player.posicion}</p>

			<p>{player.descripcion}</p>
		</div>
	);
};

export default PlayerComponent;
