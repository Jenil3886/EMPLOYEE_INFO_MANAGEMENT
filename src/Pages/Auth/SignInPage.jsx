import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_FIELDS } from "../../Helper/tabs";

export const SigninPage = () => {
	const navigate = useNavigate();

	const handleSignIn = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		// Log the data to check if it's correct
		console.log("Form Data:", data);

		// Check if 'role' exists
		const userRole = data.role;
		if (!userRole) {
			alert("Please select a role.");
			return;
		}

		// Fetch existing data from localStorage or initialize default structure
		let signData = JSON.parse(localStorage.getItem("signData")) || {
			AdminData: [],
			HrData: [],
			UserData: [],
		};

		// Create a new user object
		const newUser = {
			username: data.username,
			email: data.email,
			password: data.password,
			role: data.role,
		};

		// Add user to the correct role category
		if (userRole === "Admin") {
			signData.AdminData.push(newUser);
		} else if (userRole === "Hr") {
			signData.HrData.push(newUser);
		} else if (userRole === "User") {
			signData.UserData.push(newUser);
		} else {
			alert("Invalid role selected.");
			return;
		}

		// Store updated signData in localStorage
		localStorage.setItem("signData", JSON.stringify(signData));

		// Verify storage (for debugging)
		console.log("Updated LocalStorage Data:", JSON.parse(localStorage.getItem("signData")));

		// Redirect to the login page
		navigate("/login");
	};

	return (
		<div className="flex flex-col justify-center items-center ">
			<div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 lg:px-6">
				<div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
					<p className="text-[32px] font-bold text-white">Sign in</p>

					<div className="relative my-4">
						<div className="relative flex items-center py-1">
							<div className="grow border-t border-zinc-800"></div>
							<div className="grow border-t border-zinc-800"></div>
						</div>
					</div>
					<div>
						<form noValidate="" className="mb-4" onSubmit={handleSignIn}>
							<div className="grid gap-2">
								{SIGN_IN_FIELDS.map((field, index) =>
									field.type === "select" ? (
										<select key={index} name={field.name} className="p-2 rounded bg-gray-700 border border-gray-600">
											{field.options.map((option, idx) => (
												<option key={idx} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									) : (
										<div key={field.id} className="grid gap-1">
											<label className="text-white" htmlFor={field.id}>
												{field.label}
											</label>
											<input
												className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border bg-zinc-950 text-white border-zinc-800 px-4 py-3 text-sm font-medium placeholder:text-zinc-400 focus:outline-0"
												id={field.id}
												placeholder={field.placeholder}
												type={field.type}
												name={field.id}
												autoComplete={field.autoComplete}
											/>
										</div>
									)
								)}

								<p className="text-white">
									we are already exesting
									<Link to="/login" className="ms-2 text-blue-600 font-semibold hover:underline underline-offset-2">
										/ login
									</Link>
								</p>
								<button
									className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
									type="submit"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
