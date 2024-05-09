import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";

function DeleteModalComponent({ isOpen, onClose, onConfirm }) {
	const [isConfirming, setIsConfirming] = useState(false);

	const handleConfirm = () => {
		setIsConfirming(true);
		onConfirm();
	};

	return (
		<div className="flex w-full h-full bg-night/70 absolute left-0 top-0 justify-center items-center px-4">
			<div className="flex flex-col justify-between min-w-[250px] h-[250px] px-9 py-4 rounded-2xl bg-red-500 text-white">
				<div className="flex justify-between">
					<h3 className="text-xl">Eliminar Equipo</h3>
					<span
						className="w-5 h-5 hover:text-gunmetal transition duration-300 cursor-pointer"
						onClick={onClose}
					>
						<CloseOutlined />
					</span>
				</div>
				<p>¿Estás seguro de que quieres eliminar este equipo?</p>
				<div className="flex justify-between">
					<span
						className="border-2 border-night rounded-2xl py-1 px-2 hover:bg-gunmetal hover:border-gunmetal hover:scale-105 transition duration-300 cursor-pointer"
						onClick={onClose}
					>
						Cancelar
					</span>
					<button
						className="bg-persian hover:bg-[#1E7166] text-dayWhite hover:scale-105 transition duration-300 cursor-pointer rounded-2xl py-1 px-2"
						onClick={handleConfirm}
						disabled={isConfirming}
					>
						{isConfirming ? "Eliminando..." : "Confirmar"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteModalComponent;
