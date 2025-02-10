import { useState } from "react";
import { useSelector } from "react-redux";

export const IncrementSalaryModal = ({ isOpenSalary, onCloseSalary }) => {
	if (!isOpenSalary) return null;

	const employees = useSelector((state) => state.employee.value); // Fetch employees from Redux

	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("Select Employee");
	const [isOpenForm, setIsOpenForm] = useState(false);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
			<div className=" bg-gray-50 rounded-lg shadow-lg  max-w-7xl">
				<div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300 w-full bg-slate-300 rounded-t-lg gap-96">
					<h1 className="font-semibold text-3xl text-gray-800 ms-4">Increment Employee Salary</h1>

					<button onClick={onCloseSalary} className="text-gray-500 hover:text-gray-700 text-3xl me-4">
						&times;
					</button>
				</div>
				<div className="flex my-3 items-start ">
					<div className="flex flex-col py-2 px-3 w-full gap-3 relative">
						{/* Dropdown Button */}
						<button onClick={() => setIsOpen(!isOpen)} className="bg-gray-600 text-white text-start p-2 rounded-md focus:outline-none text-lg">
							{selected}
						</button>

						{/* Dropdown List */}
						{isOpen && (
							<ul className="absolute mt-2 w-full max-w-[783px] bg-gray-600 rounded-md shadow-lg z-10">
								{employees.length > 0 ? (
									employees.map((emp, index) => (
										<li
											key={emp.id || index}
											className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer"
											onClick={() => {
												setIsOpen(false);
												setSelected(emp.name); // Set employee name on select
												setIsOpenForm(true);
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
						{isOpenForm && (
							<form className="flex flex-col my-9 mx-2 gap-5">
								<div className="border border-gray-300  rounded-md ">
									<input type="text" placeholder="Enter Name" className="p-2 rounded-md w-full bg-slate-200 " />
								</div>
								<div className="border border-gray-300  rounded-md ">
									<input type="text" placeholder="Enter Designaition" className="p-2 rounded-md w-full bg-slate-100" />
								</div>
								<div className="border border-gray-300  rounded-md ">
									<p className="p-2 rounded-md w-full bg-slate-400 text-gray-600">Current salary</p>
								</div>
							</form>
						)}
					</div>
				</div>
				<div className="flex items-center justify-end gap-5 text-white mb-5 border-t border-gray-400 pt-5">
					<div className="bg-gray-700 py-2 px-3 rounded" onClick={onCloseSalary}>
						Close
					</div>
					<button type="submit" className="bg-gray-700 py-2 px-3 rounded me-4">
						Increment Salary
					</button>
				</div>
			</div>
		</div>
	);
};
