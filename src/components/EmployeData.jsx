import { AddEmploioModal } from "./modal/AddEmploye";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { EmployeDroup } from "./Droupdowns/employeDroup";
import { AddProjectModal } from "./modal/AddProject";
import { IncrementSalaryModal } from "./modal/IncrementSalary";

export const EmployeData = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isProjectOpen, setIsProjectOpen] = useState(false);
	const [isSalaryOpen, setIsSalaryOpen] = useState(false);

	const employees = useSelector((state) => state.employee.value);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-white bg-gray-700 text-5xl py-6 my-10 rounded-md text-center font-bold">Employee Data</h1>

			<div className="flex justify-between items-center text-white my-8">
				<div className="text-3xl font-semibold">All Employee</div>
				<div className="flex items-center justify-between gap-5">
					<button className="bg-gray-700 py-2 px-3 rounded" onClick={() => setIsProjectOpen(true)}>
						+ Add Project
					</button>
					<button className="bg-gray-700 py-2 px-3 rounded" onClick={() => setIsModalOpen(true)}>
						+ Add Employee
					</button>
					<button className="bg-gray-700 py-2 px-3 rounded" onClick={() => setIsSalaryOpen(true)}>
						Increment Salary
					</button>
				</div>
			</div>

			<div className="  shadow-md shadow-gray-700 sm:rounded-lg">
				<table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs  text-gray-400 uppercase p bg-gray-700 ">
						<tr>
							<th scope="col" className="px-6 py-3">
								index
							</th>
							<th scope="col" className="px-6 py-3">
								Employee
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Email
							</th>
							{/* <th scope="col" className="px-6 py-3">
								Gender
							</th> */}
							<th scope="col" className="px-6 py-3">
								Designation
							</th>
							{/*
							<th scope="col" className="px-6 py-3">
								Joining Date
							</th> */}

							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{employees && employees.length > 0 ? (
							employees.map((emp, index) => (
								<tr
									key={emp.id || index}
									className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
								>
									<td className="px-6 py-4">{index + 1}</td>
									<td className="px-6 py-4 text-4xl">
										<FaUserCircle />
									</td>
									<td className="px-6 py-4">{emp.name}</td>
									<td className="px-6 py-4">{emp.email}</td>
									<td className="px-6 py-4">{emp.designation}</td>
									<td className="px-6 py-4 overflow-y-visible">
										<EmployeDroup data={emp} />
									</td>
								</tr>
							))
						) : (
							<tr>
								<td>
									<h1 className="text-3xl text-center my-10 font-bold ">NO EMPLOYEE DATA IS NOT FOUND</h1>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Modals */}
			<AddEmploioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<AddProjectModal isOpenProject={isProjectOpen} onCloseProject={() => setIsProjectOpen(false)} />
			<IncrementSalaryModal isOpenSalary={isSalaryOpen} onCloseSalary={() => setIsSalaryOpen(false)} />
		</div>
	);
};
