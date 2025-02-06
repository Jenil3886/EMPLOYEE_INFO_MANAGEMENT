import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../../Features/AddEmploye";
import { useEffect } from "react";
import { validString } from "../../Constants/Constants.JSX";
import { validEmail } from "../../Constants/Constants.JSX";

export const AddEmploioModal = ({ data, isOpen, onClose }) => {
	if (!isOpen) return null;

	const dispatch = useDispatch();

	// *STATS FOR FORM FIELDS* //
	const [name, setName] = useState("");
	const [designation, setDesignation] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ name: "", designation: "", email: "", password: "" });

	console.log(data);

	// **USE EFFECT TO AUTO-FILL DATA ON OPEN** //
	useEffect(() => {
		if (data) {
			setName(data.name || "");
			setDesignation(data.designation || "");
			setEmail(data.email || "");
			setPassword(data.password || "");
		}
	}, [data, isOpen]); // **RUN WHEN `DATA` OR `ISOPEN` CHANGES** //

	// **FORM VALIDATION** //

	const handleSubmit = (e) => {
		e.preventDefault();

		// **VALIDATE FORM** //

		// If Editing Existing Employee, Update it
		const newEmployee = {
			id: data?.id || Date.now(), //  Agar update ho raha hai to purana ID rakho
			name,
			designation,
			email,
			password,
		};

		if (data) {
			// If employee exists, update it
			dispatch(updateEmployee(newEmployee));
		} else {
			// Else, add a new employee
			dispatch(addEmployee(newEmployee));
		}

		onClose();

		// **RESET FILDS** //
		setName("");
		setDesignation("");
		setEmail("");
		setPassword("");
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-gray-50  rounded-lg shadow-lg w-auto">
				<div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300 w-full bg-slate-400 rounded-t-lg">
					<h1 className="font-semibold text-3xl text-gray-800 ms-4">{data ? "Edit Employee" : "Add Employee"}</h1>

					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl me-4">
						&times;
					</button>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col  mx-4 gap-5">
					<div className="flex items-center justify-around gap-5">
						<div className="border border-gray-300  rounded-md ">
							<input
								type="text"
								placeholder="Enter Name"
								className="p-2 rounded-md w-96 bg-slate-300 "
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="border border-gray-300  rounded-md ">
							<input
								type="text"
								placeholder="Enter Designaition"
								className="p-2 rounded-md  w-96 bg-slate-300"
								value={designation}
								onChange={(e) => setDesignation(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex items-center justify-around gap-5">
						<div className="border border-gray-300  rounded-md ">
							<input
								type="text"
								placeholder="Enter Email"
								className="p-2 rounded-md w-96 bg-slate-300"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="border border-gray-300  rounded-md ">
							<input
								type="text"
								placeholder="Enter Password"
								className="p-2 rounded-md  w-96 bg-slate-300"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex items-center justify-end gap-5 text-white mb-5 ">
						<div className="bg-gray-700 py-2 px-3 rounded" onClick={onClose}>
							Close
						</div>
						<button type="submit" className="bg-gray-700 py-2 px-3 rounded">
							{data ? "Update Employee" : "Add Employe"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
