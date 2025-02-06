import { useState } from "react";
import { AddEmploioModal } from "../modal/AddEmploye";
import { LuMenu } from "react-icons/lu";
import { ChangePassword } from "../modal/ChangePassword";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../Features/AddEmploye";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit, MdOutlineLockReset } from "react-icons/md";

export const EmployeDroup = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	// Modal State's
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOpenChangePass, setIsOpenChanePass] = useState(false);
	const [selectedEmployess, setSelectedEmployess] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this employee?")) {
			let empList = JSON.parse(localStorage.getItem("empList")) ?? [];

			// 🛠 Filter out the deleted employee
			const updateList = empList.filter((val) => val.id !== props.data.id);

			console.log(updateList);

			// 🛠 Updated LocalStroge
			localStorage.setItem("empList", JSON.stringify(updateList));

			// 🛠 Dispatch to Redux store
			dispatch(deleteEmployee(updateList));

			// 🛠 Close Dropdown After Deletion
			setIsOpen(false);
		}
	};

	const handleEdit = () => {
		setSelectedEmployess(props.data); // Set Employee Data
		setIsModalOpen(true);

		// 🛠 Close Dropdown After Edit
		setIsOpen(false);
	};

	// console.log(props.data);

	return (
		<div className="relative inline-block text-left">
			<button onClick={() => setIsOpen(!isOpen)} className="bg-gray-700 text-white p-2 rounded-md focus:outline-none text-lg">
				<LuMenu />
			</button>

			{isOpen && (
				<ul className="absolute mt-2 w-32 bg-gray-700 rounded-md shadow-lg z-10">
					{/* Static Dropdown Options */}
					<li
						className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer flex items-center gap-2"
						onClick={() => navigate(`/profile/${props.data.id}`)}
					>
						{/* <Link rel="stylesheet" to={`/User/${props.data.id}`} href=""> */}
						<FaEye className="text-lg" />
						<div className="">View</div>
						{/* </Link> */}
					</li>
					<li className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer flex items-center gap-2" onClick={handleEdit}>
						<MdEdit className="text-lg" />
						<div className="">Edit</div>
					</li>
					<li className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer flex items-center gap-2" onClick={handleDelete}>
						<MdDelete className="text-lg" />
						<div className="">Delete</div>
					</li>
					<li
						className="p-2 hover:bg-gray-500 rounded-md hover:text-gray-300 cursor-pointer flex items-center gap-2"
						onClick={() => {
							setIsOpen(false);
							setIsOpenChanePass(true); // Open Change Password Modal
						}}
					>
						<MdOutlineLockReset className="text-2xl" />
						<div className="">Change Password</div>
					</li>
				</ul>
			)}

			<AddEmploioModal data={props.data} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<ChangePassword isOpenChangePass={isOpenChangePass} onCloseChangePass={() => setIsOpenChanePass(false)} />
		</div>
	);
};
