import React from "react";
import { NavLink } from "react-router-dom";
import { NavbarType } from "../types";

export const NavbarComponent = () => {
	const routes: NavbarType[] = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Crear Equipo",
			path: "/team/create",
		},
	];

	return (
		<nav className="flex h-14 text-xl items-center justify-around bg-night text-dayWhite border-b border-dayWhite/50">
			{routes.map((route: NavbarType, index: number) => (
				<NavLink
					key={index}
					className={({ isActive }) =>
						isActive
							? "text-sandy transition delay-150 duration-100 ease-in-out"
							: ""
					}
					to={route.path}
				>
					{route.name}
				</NavLink>
			))}
		</nav>
	);
};
