import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddLeaveModal = ({ isOpenLeave, onCloseLeave, onSubmit }) => {
	if (!isOpenLeave) return null;
	const navigate = useNavigate();

	const employees = useSelector((state) => state.employee.value); // Fetch employees from Redux

	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("Select Employee");
	const [showTimeInputs, setShowTimeInputs] = useState(false);

	const [formData, setFormData] = useState({
		employeeName: "",
		startDate: "",
		endDate: "",
		reason: "",
		startTime: "",
		endTime: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation
		if (
			!formData.employeeName ||
			!formData.startDate ||
			!formData.endDate ||
			!formData.reason ||
			(showTimeInputs && (!formData.startTime || !formData.endTime))
		) {
			alert("All fields are required.");
			return;
		}

		onSubmit(formData);

		onCloseLeave();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
			<div className="bg-gray-50 rounded-lg shadow-lg max-w-5xl w-full mx-4">
				<div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300 w-full bg-slate-300 rounded-t-lg">
					<h1 className="font-semibold text-3xl text-gray-800 ms-4">Add Employee Leaves</h1>
					<button onClick={onCloseLeave} className="text-gray-500 hover:text-gray-700 text-3xl me-4">
						&times;
					</button>
				</div>

				<div className="flex flex-col my-3 items-start px-4">
					<div className="flex flex-col py-2 w-full gap-3 relative">
						{/* Dropdown Button */}
						<button onClick={() => setIsOpen(!isOpen)} className="bg-gray-600 text-white text-start p-2 rounded-md focus:outline-none text-lg">
							{selected}
						</button>

						{/* Dropdown List */}
						{isOpen && (
							<ul className="absolute mt-2 w-full bg-gray-600 rounded-md shadow-lg z-10">
								{employees.length > 0 ? (
									employees.map((emp, index) => (
										<li
											key={emp.id || index}
											className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer"
											onClick={() => {
												setIsOpen(false);
												setSelected(emp.name); // Set employee name on select
												setFormData((prevData) => ({
													...prevData,
													employeeName: emp.name,
												}));
											}}
										>
											{emp.name}
										</li>
									))
								) : (
									<li className="p-2 text-gray-300">No employees found</li>
								)}
							</ul>
						)}
					</div>
					<form className="w-full flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
						<div className="w-full flex items-center justify-around">
							<div className="flex gap-4">
								<input
									className="w-full bg-gray-500 px-3 py-2 text-black rounded"
									id="startDate"
									type="date"
									name="startDate"
									value={formData.startDate}
									onChange={handleChange}
									required
								/>

								<input
									className="w-full bg-gray-500 px-3 py-2 text-black rounded"
									id="endDate"
									type="date"
									name="endDate"
									value={formData.endDate}
									onChange={handleChange}
									required
								/>
							</div>

							<label className="inline-flex items-center cursor-pointer">
								<input type="checkbox" className="sr-only peer" checked={showTimeInputs} onChange={() => setShowTimeInputs(!showTimeInputs)} />
								<div className="relative w-11 h-6 bg-gray-200 rounded-full  dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
								<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Half Day</span>
							</label>

							{showTimeInputs && (
								<div className="flex gap-4">
									<input
										className="w-full bg-gray-500 px-3 py-2 text-black rounded"
										id="startTime"
										type="time"
										name="startTime"
										value={formData.startTime}
										onChange={handleChange}
										required
									/>

									<input
										className="w-full bg-gray-500 px-3 py-2 text-black rounded"
										id="endTime"
										type="time"
										name="endTime"
										value={formData.endTime}
										onChange={handleChange}
										required
									/>
								</div>
							)}
						</div>

						<div className="mb-4">
							<label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="reason">
								Reason
							</label>
							<textarea
								className="w-full px-3 py-2 bg-gray-500 text-black rounded"
								id="reason"
								name="reason"
								value={formData.reason}
								onChange={handleChange}
								rows={3}
								required
							></textarea>
						</div>

						<div className="flex items-center justify-end gap-5 text-white mb-5 border-t border-gray-400 pt-5">
							<button className="bg-gray-700 py-2 px-3 rounded cursor-pointer" type="submit">
								Add Leave
							</button>
							<div className="bg-gray-700 py-2 px-3 rounded cursor-pointer" onClick={onCloseLeave}>
								Close
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
