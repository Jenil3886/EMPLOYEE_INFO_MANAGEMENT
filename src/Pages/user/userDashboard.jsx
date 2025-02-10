import { Link } from "react-router-dom";

export const UserDashboard = () => {
	return (
		<div>
			<div className="text-2xl font-bold text-white">User Dashboard</div>
			<Link to={`/leave`}> Reaquest For Leave</Link>
		</div>
	);
};
