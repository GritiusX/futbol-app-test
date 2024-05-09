import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectTeam } from "../store/features/teams/teamSlice.ts";
import PlayerComponent from "../components/PlayerComponent.tsx";
import { Player } from "../types.ts";
import { teamsController } from "../controllers/teamsControllers.ts";
import DeleteModalComponent from "../components/DeleteModalComponent.tsx";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function TeamPage() {
	const navigate = useNavigate();
	const teamId = useParams()?.teamId;
	const dispatch = useDispatch();

	const selectedTeam = useSelector(
		(state: any) => state.TeamState.selectedTeam
	);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const editTeam = () => {
		if (selectedTeam) {
			navigate(`/team/create/${selectedTeam.id}`);
		}
	};

	const deleteTeam = () => {
		if (selectedTeam) {
			setIsDeleteModalOpen(false);
			teamsController.deleteTeamFromLocal(selectedTeam.id, dispatch);
			return navigate("/");
		}
		return;
	};

	useEffect(() => {
		if (!teamId) {
			return;
		}
		dispatch(selectTeam({ teamId: parseInt(teamId) }));
	}, [dispatch, teamId, selectedTeam]);

	return (
		<>
			<section className="min-h-[calc(100vh-56px)] w-full p-4 relative flex flex-col items-center">
				{selectedTeam && (
					<>
						<div className="flex flex-col gap-2 text-dayWhite w-full items-center">
							<div className="flex gap-4 items-center">
								<div className="flex flex-col">
									<p className="text-3xl font-semibold text-center">
										{selectedTeam.nombre}
									</p>
									<p className="text-center text-xl">
										Equipo de: {selectedTeam.tipo.toUpperCase()}
									</p>
								</div>
								<div className="flex flex-col gap-1">
									<span
										className="rounded-lg bg-gunmetal hover:bg-persian hover:text-blue-200 transition-all duration-300 hover:scale-105 text-dayWhite cursor-pointer"
										onClick={editTeam}
									>
										<EditOutlined className="w-9 h-9 justify-center" />
									</span>
									<span
										className="rounded-lg bg-red-600 hover:bg-red-800 hover:text-red-200 transition-all duration-300 hover:scale-105 text-dayWhite cursor-pointer"
										onClick={() => setIsDeleteModalOpen(true)}
									>
										<DeleteOutlined className="w-9 h-9 justify-center" />
									</span>
								</div>
							</div>
						</div>

						<div className="flex flex-col w-full sm:grid sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
							{selectedTeam.jugadores.map((jugador: Player) => (
								<PlayerComponent
									key={jugador.numero}
									className="bg-gunmetal text-white rounded-xl"
									player={jugador}
								/>
							))}
						</div>
					</>
				)}
				{!selectedTeam && (
					<h2 className="text-2xl text-center px-6 my-14">
						El equipo no esta disponible o no existe, vuelva a intentar más
						tarde
					</h2>
				)}
				{isDeleteModalOpen && (
					<DeleteModalComponent
						isOpen={isDeleteModalOpen}
						onClose={() => setIsDeleteModalOpen(false)}
						onConfirm={deleteTeam}
					/>
				)}
			</section>
		</>
	);
}
