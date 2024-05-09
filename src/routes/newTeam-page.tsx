import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player, Team } from "../types";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "../index.css";
import { teamsController } from "../controllers/teamsControllers.ts";
import { useDispatch, useSelector } from "react-redux";
import { selectTeam } from "../store/features/teams/teamSlice.ts";

export default function NewTeamPage() {
	const navigate = useNavigate();
	const teamId = useParams()?.teamId;
	const dispatch = useDispatch();
	const selectedTeam = useSelector(
		(state: any) => state.TeamState.selectedTeam
	);

	const [teamInfo, setTeamInfo] = useState<Team>({
		id: null,
		nombre: "",
		tipo: "",
		valoracion: null,
		jugadores: [],
	});

	useEffect(() => {
		if (teamId) {
			dispatch(selectTeam({ teamId: parseInt(teamId) }));
		}
		if (selectedTeam) {
			const mutableTeam = { ...selectedTeam };
			console.log(mutableTeam);
			setTeamInfo(mutableTeam);
		}
	}, [teamId, dispatch, selectedTeam]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const clampedValue = Math.min(Math.max(parseFloat(value), 0), 5);
		const formattedValue = clampedValue.toFixed(1);

		setTeamInfo((prevState) => ({
			...prevState,
			nombre: name === "teamName" ? value : prevState.nombre,
			tipo: name === "teamType" ? value : prevState.tipo,
			valoracion:
				name === "teamValue"
					? parseFloat(formattedValue)
					: prevState.valoracion,
		}));
	};

	const handlePlayerChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		const fieldMap: Record<string, keyof Player> = {
			playerNumber: "numero",
			playerName: "nombre",
			playerPosition: "posicion",
			playerDescription: "descripcion",
		};

		const fieldName = fieldMap[name];

		if (fieldName) {
			const updatedJugadores = teamInfo.jugadores.map((jugador, i) => {
				if (i === index) {
					// Si es el índice que estamos actualizando, retornamos un nuevo objeto
					return {
						...jugador,
						[fieldName]: fieldName === "numero" ? parseInt(value) : value,
					};
				}
				return jugador;
			});

			setTeamInfo({
				...teamInfo,
				jugadores: updatedJugadores,
			});
		}
	};

	const addPlayer = () => {
		if (teamInfo.jugadores.length < 11) {
			setTeamInfo((prevState) => ({
				...prevState,
				jugadores: [
					...prevState.jugadores,
					{ img: "", numero: "", nombre: "", posicion: "", descripcion: "" },
				],
			}));
		}
	};

	const removePlayer = (index: number) => {
		setTeamInfo((prevState) => {
			const updatedJugadores = [...prevState.jugadores];
			updatedJugadores.splice(index, 1);
			return {
				...prevState,
				jugadores: updatedJugadores,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let expectedPlayerCount = 0;

		switch (teamInfo.tipo.toLowerCase()) {
			case "f5":
				expectedPlayerCount = 5;
				break;
			case "f7":
				expectedPlayerCount = 7;
				break;
			case "f11":
				expectedPlayerCount = 11;
				break;
			default:
				alert("Tipo de equipo no válido");
				return;
		}

		if (teamInfo.jugadores.length !== expectedPlayerCount) {
			return alert(
				`El equipo de ${teamInfo.tipo} debe tener ${expectedPlayerCount} jugadores.`
			);
		}

		const playerNumbers: Set<number> = new Set<number>();
		let hasDuplicateNumber: boolean = false;

		teamInfo.jugadores.forEach((jugador) => {
			if (jugador.numero) {
				if (playerNumbers.has(parseFloat(jugador.numero.toString()))) {
					hasDuplicateNumber = true;
				} else {
					playerNumbers.add(parseFloat(jugador.numero.toString()));
				}
			}
		});

		if (hasDuplicateNumber) {
			return alert("Cada jugador debe tener un número único.");
		}

		const timeStamp = Date.now();
		const teamWithTimeStamp = { ...teamInfo, id: timeStamp };

		if (teamId) {
			teamsController.updateTeam(parseInt(teamId), teamWithTimeStamp);
		} else {
			teamsController.addNewTeam(teamWithTimeStamp);
		}

		navigate("/");
	};

	return (
		<section className="min-h-[calc(100vh-56px)] flex flex-col items-center mx-3 pb-6">
			<h2 className="text-2xl font-semibold py-4 text-dayWhite">
				Estas {teamId ? "editando" : "creando"} tu equipo:
			</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 max-w-lg w-full bg-gunmetal text-dayWhite border-0 p-4 rounded-3xl "
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="teamName" className="text-sm font-medium ml-1">
						Nombre del equipo
					</label>
					<input
						type="text"
						id="teamName"
						name="teamName"
						value={teamInfo.nombre}
						onChange={handleChange}
						placeholder="Nombre del Equipo"
						required
						className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="teamType" className="text-sm font-medium ">
						Tipo de equipo
					</label>
					<input
						type="text"
						id="teamType"
						name="teamType"
						value={teamInfo.tipo}
						onChange={handleChange}
						placeholder="F5, F7 o F11"
						required
						className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="teamValue" className="text-sm font-medium ">
						Valoración
					</label>
					<input
						type="number"
						id="teamValue"
						name="teamValue"
						value={
							teamInfo.valoracion !== null ? teamInfo.valoracion.toString() : ""
						}
						onChange={handleChange}
						onKeyDown={(e) => e.key === "e" && e.preventDefault()}
						placeholder="Valoración debe ser del 0 al 5"
						required
						className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
					/>
				</div>

				<h2 className="text-lg font-medium">Jugadores</h2>

				{teamInfo.jugadores.map((jugador: any, index) => (
					<div
						key={index}
						className="flex flex-col bg-gunmetal border border-dayWhite/50 p-3 rounded-xl mb-2 cursor-default"
					>
						<div className="flex justify-between text-dayWhite">
							<div className="font-semibold rounded-full p-1 h-6 w-6 flex items-center justify-center bg-persian/50">
								<span className="text-sm">{index + 1}</span>
							</div>

							<MinusOutlined
								onClick={() => removePlayer(index)}
								className="p-1 h-6 w-6 rounded-full focus:outline-none bg-red-500 hover:bg-red-800 transition-all duration-300 ease-in-out"
							/>
						</div>
						<div key={index} className="grid grid-cols-2 grid-rows-2 gap-2 ">
							<div className="flex flex-col gap-1">
								<label
									htmlFor="playerNumber"
									className="text-sm font-medium text-dayWhite "
								>
									Número
								</label>
								<input
									type="number"
									id="playerNumber"
									name="playerNumber"
									placeholder="Número"
									value={jugador.numero}
									onChange={(e) => handlePlayerChange(index, e)}
									required
									className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									htmlFor="playerName"
									className="text-sm font-medium text-dayWhite "
								>
									Nombre
								</label>
								<input
									type="text"
									id="playerName"
									name="playerName"
									placeholder="Nombre"
									value={jugador.nombre}
									onChange={(e) => handlePlayerChange(index, e)}
									required
									className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									htmlFor="playerPosition"
									className="text-sm font-medium text-dayWhite "
								>
									Posición
								</label>
								<input
									type="text"
									id="playerPosition"
									name="playerPosition"
									placeholder="Posición"
									value={jugador.posicion}
									onChange={(e) => handlePlayerChange(index, e)}
									required
									className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label
									htmlFor="playerDescription"
									className="text-sm font-medium text-dayWhite "
								>
									Descripción
								</label>
								<input
									type="text"
									id="playerDescription"
									name="playerDescription"
									placeholder="Descripción"
									value={jugador.descripcion}
									onChange={(e) => handlePlayerChange(index, e)}
									required
									className="py-1 px-2 rounded-xl bg-persian/50 focus:bg-charcoal hover:bg-charcoal text-dayWhite focus-visible:outline-0 focus-visible:ring ring-dayWhite placeholder:text-dayWhite/80 transition duration-300 ease-in-out"
								/>
							</div>
						</div>
					</div>
				))}
				<PlusOutlined
					onClick={addPlayer}
					className="p-1 h-6 w-6 rounded-full focus:outline-none self-center bg-persian/50 hover:bg-charcoal text-dayWhite transition-all duration-300 ease-in-out"
				/>
				<button
					type="submit"
					className="mt-4 p-2 rounded-md bg-persian/50 hover:bg-charcoal text-dayWhite transition-all duration-300 ease-in-out "
				>
					{teamId ? "Editar Equipo" : "Crear Equipo"}
				</button>
			</form>
		</section>
	);
}
