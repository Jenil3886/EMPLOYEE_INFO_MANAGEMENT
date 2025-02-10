import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

export const AddProjectModal = ({ isOpenProject, onCloseProject }) => {
	if (!isOpenProject) return null;

	const [projectName, setProjectName] = useState("");
	const [tableData, setTableData] = useState([]);
	const [isEditing, setIsEditing] = useState(null);

	const handleInputChange = (e) => {
		setProjectName(e.target.value); // directly set the value
	};

	// ** Old handleSubmit ** //

	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission
		console.log("projectName is submit");

        
		if (isEditing !== null) {
			const updatedData = [...tableData];
			updatedData[isEditing] = projectName;
			setTableData(updatedData);
			setIsEditing(null);
		} else {
			setTableData([...tableData, projectName]);
		}

		setProjectName("");
	};

	const handleEdit = (index) => {
		setProjectName(tableData[index]);
		setIsEditing(index);
	};

	const handleDelete = (index) => {
		const filteredData = tableData.filter((_, i) => i !== index);
		setTableData(filteredData);
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("itemData"));
		if (storedData && storedData.length > 0) {
			setTableData(storedData);
		}
	}, []);

	useEffect(() => {
		const storedData = JSON.stringify(tableData);
		localStorage.setItem("itemData", storedData);
	}, [tableData]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className=" bg-gray-50 rounded-lg shadow-lg w-auto ">
				<div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300 w-full bg-slate-300 rounded-t-lg">
					<h1 className="font-semibold text-3xl text-gray-800 ms-4">Add Project</h1>

					<button onClick={onCloseProject} className="text-gray-500 hover:text-gray-700 text-3xl me-4">
						&times;
					</button>
				</div>
				<div className="flex mt-3 items-center">
					<div className="flex flex-col pt-2 px-3 w-96 gap-3">
						<label htmlFor="">project Name</label>
						<form onSubmit={handleSubmit} className="flex w-full my-2 items-center justify-between gap-2">
							<input
								type="text"
								placeholder="Enter Designaition"
								className="rounded-md  bg-slate-200 w-full p-2 "
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
							/>
							<button className="bg-slate-200 p-2 rounded-md text-[23px]">
								<FaCircleCheck />
							</button>
						</form>
						{tableData.length > 0 && (
							<div className="relative overflow-x-auto shadow-sm shadow-gray-700 sm:rounded-lg mb-5 w-[360px]">
								<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
									<thead className="text-xs  text-gray-400 uppercase p bg-gray-700 ">
										<tr>
											<th scope="col" className="px-6 py-3">
												Index No.
											</th>
											<th scope="col" className="px-6 py-3">
												Project Name
											</th>
											<th scope="col" className="px-6 py-3">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{tableData.map((projectName, index) => (
											<tr
												key={index}
												className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
											>
												<td className="px-6 py-3">{index + 1}</td>
												<td className="px-6 py-3">{projectName}</td>
												<td className="px-6 py-3 ">
													<div className="flex gap-8">
														<FaPencilAlt className="h-5 w-5 cursor-pointer" onClick={() => handleEdit(index)} />
														<MdDeleteForever className="h-6 w-6 cursor-pointer" onClick={() => handleDelete(index)} />
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
