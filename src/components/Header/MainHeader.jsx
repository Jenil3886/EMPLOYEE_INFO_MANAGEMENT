import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CONSTANTS } from "../../lib/constants";

export const MainHeader = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Deleted!",
					text: "Your Account has been deleted.",
					icon: "success",
				});
				localStorage.removeItem(CONSTANTS.IS_LOGGED_IN); // Clear token
				navigate("/login"); // Redirect to login page
			}
		});
	};
	return (
		<header
			className="w-full px-4 flex items-center justify-end gap-3 py-5 font-bold  text-white text-xl border-b border-gray-600"
			style={{
				height: "10vh",
			}}
		>
			<div className="flex gap-5 items-center justify-between">
				<Link to="/signin" className="bg-gray-700 py-2 px-4 rounded-md">
					Sign In
				</Link>
				<Link to="login" className="bg-gray-700 py-2 px-4 rounded-md">
					Log In
				</Link>
				<button className="bg-red-700 p-2 rounded-md" onClick={handleLogout}>
					<TbLogout className="text-3xl" />
				</button>
			</div>
		</header>
	);
};
