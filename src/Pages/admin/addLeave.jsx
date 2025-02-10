import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddLeaveModal } from "../../components/modal/AddLeave";
import { FcLeave } from "react-icons/fc";
import { MdDelete, MdOutlineDoneOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { addLeave, updateLeaveStatus, deleteLeave } from "../../Features/LeaveSclice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const AddLeave = () => {
	const [isLeaveOpen, setIsLeaveOpen] = useState(false);
	const dispatch = useDispatch();
	const leaveRequests = useSelector((state) => state.leave.value);

	const handleAddLeave = (formData) => {
		const newLeave = { ...formData, id: uuidv4() };
		dispatch(addLeave(newLeave));
		setIsLeaveOpen(false);
	};

	const handleUpdateStatus = (id, status) => {
		const confirmationMessage =
			status === "Approved" ? "Are you sure you want to approve this leave?" : "Are you sure you want to reject this leave?";
		if (window.confirm(confirmationMessage)) {
			dispatch(updateLeaveStatus({ id, status }));
		}
	};

	const handleDeleteLeave = (id) => {
		dispatch(deleteLeave(id));
	};

	return (
		<div className="flex flex-col justify-center items-center  bg-gray-900 text-white ">
			<div className="container mx-auto p-4 select-none">
				<h1 className="text-white bg-gray-700 text-5xl py-6 my-10 rounded-md text-center font-bold">Employee Leave Data</h1>

				<div className="flex justify-between items-center text-white my-8">
					<div className="text-3xl font-semibold">All Employee Leaves</div>
					<button className="flex items-center gap-2 bg-gray-700 py-2 px-3 rounded" onClick={() => setIsLeaveOpen(true)}>
						<FcLeave />
						<p>Add Leave</p>
					</button>
				</div>

				<div className="relative overflow-x-auto shadow-md shadow-gray-700 sm:rounded-lg select-none">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs  text-gray-400 uppercase p bg-gray-700 ">
							<tr>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Date & Time
								</th>
								<th scope="col" className="px-6 py-3">
									Reason
								</th>
								<th scope="col" className="px-4 py-3">
									Approved
								</th>
								<th scope="col" className="px-4 py-3">
									Reject
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
								<th scope="col" className="px-4 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{leaveRequests && leaveRequests.length > 0 ? (
								leaveRequests.map((leave) => (
									<tr
										key={leave.id}
										className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
									>
										<td className="px-6 py-4">{leave.employeeName}</td>
										<td className="px-6 py-4">
											{moment(leave.startDate).format("DD-MMM-YYYY")} {leave.startTime && `[${leave.startTime}]`} -{" "}
											{moment(leave.endDate).format("DD-MMM-YYYY")} {leave.endTime && `[${leave.endTime}]`}
										</td>
										<td className="px-6 py-4">{leave.reason}</td>
										<td className="px-4 py-4" onClick={() => handleUpdateStatus(leave.id, "Approved")}>
											<MdOutlineDoneOutline className="text-green-600 text-3xl cursor-pointer hover:text-green-700" />
										</td>
										<td className="px-4 py-4" onClick={() => handleUpdateStatus(leave.id, "Rejected")}>
											<RxCross2 className="text-red-600 text-4xl cursor-pointer hover:text-red-700" />
										</td>
										<td className="px-6 py-4">{leave.status || "Pending"}</td>
										<td className="px-4 py-4" onClick={() => handleDeleteLeave(leave.id)}>
											<MdDelete className="text-red-600 text-2xl cursor-pointer hover:text-red-700" />
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="7">
										<h1 className="text-3xl text-center my-10 font-bold">NO LEAVE DATA FOUND</h1>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			<AddLeaveModal isOpenLeave={isLeaveOpen} onCloseLeave={() => setIsLeaveOpen(false)} onSubmit={handleAddLeave} />
		</div>
	);
};
