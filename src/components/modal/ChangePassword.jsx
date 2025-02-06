import { useState } from "react";

export const ChangePassword = ({ isOpenChangePass, onCloseChangePass }) => {
	if (!isOpenChangePass) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
			<div className=" bg-gray-50 rounded-lg shadow-lg  max-w-7xl">
				<div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300 w-full bg-slate-300 rounded-t-lg gap-96">
					<h1 className="font-semibold text-3xl text-gray-800 ms-4">Increment Employee Salary</h1>

					<button onClick={onCloseChangePass} className="text-gray-500 hover:text-gray-700 text-3xl me-4">
						&times;
					</button>
				</div>
				<div className="flex flex-col px-5 my-8 w-full items-center justify-between gap-5">
					<input type="text" placeholder="Enter Designaition" className="rounded-md  bg-slate-200 w-full p-2.5 " />
					<input type="text" placeholder="Enter Designaition" className="rounded-md  bg-slate-200 w-full p-2.5 " />
				</div>

				<div className="flex items-center justify-end gap-5 text-white mb-5 border-t border-gray-400 pt-5 select-none">
					<div className="bg-gray-700 py-2 px-3 rounded" onClick={onCloseChangePass}>
						Close
					</div>
					<button type="submit" className="bg-gray-700 py-2 px-3 rounded me-4">
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
};
