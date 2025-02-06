import { useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useEffect } from "react";

export const ProfileView = () => {
	const [isOpenDrop, setIsopenDrop] = useState(false);
	const [isOpenForm, setIsOpenForm] = useState(false);

	const { id } = useParams();
	const employees = useSelector((state) => state.employee.value);
	const employee = employees.find((emp) => emp.id.toString() === id);

	if (!employee) {
		return <h1 className="text-center text-white text-3xl mt-10">Employee Not Found</h1>;
	}

	const navigate = useNavigate();

	const navigateToBack = () => {
		navigate(-1);
	};

	// const employees = useSelector((state) => state.employee.value); //  Fetch employees from Redux

	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("Select Employee");

	// **Task Crud** //

	const [formData, setFormData] = useState({
		taskTitle: "",
		taskDescription: "",
		estimatedTime: "",
		taskPriority: "",
	});

	const [tableData, setTableData] = useState([]);

	const [isEditing, setIsEditing] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("taskData"));
		if (storedData && storedData.length > 0) {
			setTableData(storedData);
		}
	}, []);

	// useEffect(() => {
	// 	const storedData = JSON.stringify(tableData);
	// 	localStorage.setItem("taskData", storedData);
	// }, [tableData]);

	useEffect(() => {
		if (tableData.length > 0) {
			localStorage.setItem("taskData", JSON.stringify(tableData));
		}
	}, [tableData]);

	const handleSubmit = (e) => {
		console.log("submit");

		e.preventDefault();

		if (isEditing !== null) {
			const updateData = [...tableData];
			updateData[isEditing] = formData;
			setTableData(updateData);
			setIsEditing(null);
		} else {
			setTableData([...tableData, formData]);
		}

		setFormData({
			taskTitle: "",
			taskDescription: "",
			estimatedTime: "",
			taskPriority: "",
		});

		setIsOpenForm(true);
	};

	const handleEdit = (index) => {
		setFormData(tableData[index]);
		setIsOpenForm(true);
		setIsEditing(index);
	};

	const handleDelete = (index) => {
		const filteredData = tableData.filter((_, i) => i !== index);
		setTableData(filteredData);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex w-full bg-gray-700 px-3 py-6 my-10 rounded-md text-center items-center gap-1">
				<button
					onClick={navigateToBack}
					className="w-8 h-8 flex justify-center items-center text-2xl  rounded-full text-white hover:bg-gray-500 duration-200"
				>
					<IoIosArrowBack />
				</button>
				<div className="text-center w-full">
					<h1 className="text-white text-5xl font-bold">Profile</h1>
				</div>
			</div>

			<div className="container mx-auto p-4">
				<div className="flex flex-wrap justify-evenly">
					{/* Left Column */}
					<div className="w-full sm:w-4/12 ">
						<div className="p-2 bg-gray-700 h-[300px] rounded-md">
							<FaUserCircle className="h-48 w-48 text-gray-200 mx-auto" />
							<h3 className="mt-3 text-center text-3xl font-semibold text-white">{employee.name}</h3>
							<div className="text-center text-white">{employee.designation}</div>
						</div>
						<div
							className="bg-gray-500 py-4 mt-5 w-full select-none text-center text-2xl text-white  font-semibold rounded-md cursor-pointer hover:bg-gray-400 duration-300"
							onClick={() => setIsopenDrop(!isOpenDrop)}
						>
							Add Task
						</div>
						{isOpenDrop && (
							<div className="flex flex-col py-2  w-full gap-3 relative">
								{/* Dropdown Button */}
								<button
									onClick={() => setIsOpen(!isOpen)}
									className="bg-gray-600 text-white text-start p-2 px-5 rounded-md focus:outline-none text-lg select-none"
								>
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
														setSelected(emp.name); //  Set employee name on select
														setFormData((prev) => ({ ...prev, employeeName: emp.name }));
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
							</div>
						)}
						{isOpenForm && (
							<form className="max-w-sm mx-auto flex flex-col gap-3" onSubmit={handleSubmit}>
								<div>
									<label htmlFor="title" className="block mb-2 text-sm font-medium  text-white">
										Task Title
									</label>
									<input
										type="text"
										id="title"
										name="taskTitle"
										className="shadow-xs  border  text-sm rounded-lgblock w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  shadow-xs-light"
										placeholder="Enter Task Title"
										value={formData.taskTitle}
										onChange={handleInputChange}
										required
									/>
								</div>

								<div>
									<label htmlFor="message" className="block mb-2 text-sm font-medium  text-white">
										Task description
									</label>
									<textarea
										id="taskDescription"
										name="taskDescription"
										rows="4"
										className="block p-2.5 w-full text-sm  bg-gray-700 rounded-lg border border-gray-300bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
										placeholder="Enter description"
										value={formData.taskDescription}
										onChange={handleInputChange}
									></textarea>
								</div>

								<div>
									<label htmlFor="countries" className="block mb-2 text-sm font-medium  text-white">
										Task Priority
									</label>
									<select
										id="taskPriority"
										name="taskPriority"
										className=" border text-sm rounded-lgblock w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
										value={formData.taskPriority}
										onChange={handleInputChange}
									>
										<option value="">Task Priority</option>
										<option value="High">High</option>
										<option value="Medium">Medium</option>
										<option value="Low">Low</option>
									</select>
								</div>

								<div>
									<label htmlFor="title" className="block mb-2 text-sm font-medium  text-white">
										Estimated Time
									</label>
									<input
										type="time"
										id="estimatedTime"
										name="estimatedTime"
										className="shadow-xs text-sm rounded-lgblock w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  shadow-xs-light"
										placeholder="add time"
										value={formData.estimatedTime}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className="flex items-center justify-center">
									<button type="submit" className="select-none bg-gray-600 hover:bg-gray-500 duration-150 w-28 text-gray-200 text-md py-1 rounded-md">
										{isEditing !== null ? "Update" : "Submit"}
									</button>
								</div>
							</form>
						)}
					</div>

					{/* Right Column */}
					<div className="w-full sm:w-7/12 bg-gray-700 p-4 rounded-md">
						<h3 className="font-semibold mb-4 bg-gray-500 py-4 rounded-md text-center text-white text-3xl">User Details</h3>
						<div className="space-y-5 text-xl">
							<div className="text-white shadow-md py-2 px-2 rounded-md">Email : {employee.email}</div>
							<div className="text-white shadow-md py-2 px-2 rounded-md">Gender : {employee.gender}</div>
							<div className="text-white shadow-md py-2 px-2 rounded-md">Designation : {employee.designation}</div>
							<div className="text-white shadow-md py-2 px-2 rounded-md">Salary : {employee.salary}</div>
							<div className="text-white shadow-md py-2 px-2 rounded-md">Joining Date : {employee.joiningDate}</div>
							<div className="text-white shadow-md py-2 px-2 rounded-md">Working Days : {employee.workingDays} days</div>
						</div>
					</div>
				</div>
				{tableData.length > 0 && (
					<div className="relative overflow-x-auto shadow-sm shadow-gray-700 sm:rounded-lg my-5 w-full">
						<table className="w-full text-sm text-left rtl:text-right  text-gray-400">
							<thead className="text-xs  text-gray-400 uppercase p bg-gray-700 ">
								<tr>
									<th scope="col" className="px-6 py-3">
										Index No
									</th>
									<th scope="col" className="px-6 py-3">
										Project Name
									</th>
									<th scope="col" className="px-6 py-3">
										Task Title
									</th>
									<th scope="col" className="px-6 py-3">
										Task description
									</th>
									<th scope="col" className="px-6 py-3">
										Task Priority
									</th>
									<th scope="col" className="px-6 py-3">
										Estimated Time
									</th>
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((item, index) => (
									<tr key={index} className=" odd:bg-gray-900  even:bg-gray-800 border-b border-gray-200">
										<td className="px-6 py-3">{index + 1}</td>
										<td className="px-6 py-3">{employee.name}</td>
										<td className="px-6 py-3">{item.taskTitle}</td>
										<td className="px-6 py-3">{item.taskDescription}</td>
										<td className="px-6 py-3">{item.taskPriority}</td>
										<td className="px-6 py-3">{item.estimatedTime}</td>
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
	);
};
