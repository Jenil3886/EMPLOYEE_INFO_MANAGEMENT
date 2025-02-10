import { IoIosArrowBack } from "react-icons/io";
import { AUTH_FIELDS } from "../../Helper/tabs";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../lib/constants";

export const LoginPage = () => {
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		// Validation
		if (!data.email || !data.password) {
			alert("All fields are required.");
			return;
		}

		if (!/\S+@\S+\.\S+/.test(data.email)) {
			alert("Please enter a valid email address.");
			return;
		}

		// Retrieve stored user data
		const authData = JSON.parse(localStorage.getItem(CONSTANTS.AUTH_DATA)) || {
			AdminData: [],
			HrData: [],
			UserData: [],
		};

		let userData = null;

		// Function to check user credentials in a given array
		const findUser = (usersArray) => usersArray.find((user) => user.email === data.email && user.password === data.password);

		// Check in AdminData
		if (Array.isArray(authData.AdminData)) {
			userData = findUser(authData.AdminData);
		}

		// Check in HrData
		if (!userData && Array.isArray(authData.HrData)) {
			userData = findUser(authData.HrData);
		}

		// Check in UserData
		if (!userData && Array.isArray(authData.UserData)) {
			userData = findUser(authData.UserData);
		}

		// If userData found, redirect based on role
		if (userData) {
			localStorage.setItem(CONSTANTS.IS_LOGGED_IN, JSON.stringify(userData)); // Store session data
			if (userData.role === CONSTANTS.ADMIN) {
				navigate("/admin");
			} else if (userData.role === CONSTANTS.HR) {
				navigate("/hr");
			} else {
				navigate("/user");
			}
		} else {
			alert("Invalid email or password");
		}
	};

	const navigateToBack = () => {
		navigate(-1);
	};

	return (
		<div className="flex flex-col justify-center items-center ">
			<div className="mx-auto flex w-full flex-col justify-center px-5 pt-0 md:max-w-[50%]  lg:px-6">
				<div className="mt-10 w-fit text-white">
					<div className="flex w-fit items-center lg:pl-0 lg:pt-0 xl:pt-0">
						<div className="hover:bg-gray-700 duration-150 rounded-full p-[3px] me-3" onClick={navigateToBack}>
							<IoIosArrowBack className="text-sm" />
						</div>
						<p className="ml-0 text-sm text-white">Back to Sign In Page</p>
					</div>
				</div>
				<div className="my-auto mb-auto mt-8 flex flex-col md:mt-[70px] w-[350px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
					<p className="text-[32px] font-bold text-white">Log in</p>
					<p className="mb-2.5 mt-2.5 font-normal text-zinc-400">Enter your email and password to sign in!</p>

					<div className="relative my-4">
						<div className="relative flex items-center py-1">
							<div className="grow border-t border-zinc-800"></div>
							<div className="grow border-t border-zinc-800"></div>
						</div>
					</div>
					<div>
						<form noValidate="" className="mb-4" onSubmit={handleLogin}>
							<div className="grid gap-2">
								{AUTH_FIELDS.map((field) => (
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
											required
										/>
									</div>
								))}
								<p className="text-white">
									we are first time visit in our site
									<Link to="/signin" className="ms-2 text-blue-600 font-semibold hover:underline underline-offset-2">
										/ signin
									</Link>
								</p>
								<button
									className="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-950 hover:bg-white/90 active:bg-white/80 flex w-full max-w-full mt-6 items-center justify-center rounded-lg px-4 py-4 text-base font-medium"
									type="submit"
								>
									Log in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
