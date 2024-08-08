'use client';

import { apiURL } from '@/Constant';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [activeTab, setActiveTab] = useState('profile');
	const [myRecipies, setMyRecipies] = useState(null);
	const [allRecipies, setAllRecipies] = useState(null);

	const [userFavorites, setUserFavorites] = useState(null);
	const [loadingFav, setLoadingFav] = useState(false);

	const router = useRouter();

	const login = async (email, password) => {
		try {
			let response = await fetch(`${apiURL}/users/login`, {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			response = await response.json();

			if (!response.success) {
				setMessage({
					success: false,
					message: response.message,
				});
			}

			if (response.success) {
				setIsAuthenticated(true);
				setUser(response.data.user);
				setMessage({
					success: true,
					message: 'Login successfull',
				});
				router.push('/recipies');
			}
		} catch (error) {
			setMessage({
				success: false,
				message: 'Login failed',
			});
		}
	};

	const logout = async () => {
		try {
			let response = await fetch(`${apiURL}/users/logout`, {
				method: 'POST',
				credentials: 'include',
			});

			response = await response.json();

			if (response.success) {
				setIsAuthenticated(false);
				setUser(null);
				setMessage({
					success: true,
					message: 'logged out.',
				});
				router.push('/');
			}
			if (!response.success) {
				setMessage({
					success: false,
					message: response.message,
				});
			}
		} catch (error) {
			setMessage({
				success: false,
				message: 'Logout falied!',
			});
		}
	};

	const updateAccount = async (username, fullName, email, phone, bio) => {
		try {
			let response = await fetch(`${apiURL}/users/update-account`, {
				method: 'PATCH',
				body: JSON.stringify({
					username,
					fullName,
					email,
					phone,
					bio,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			response = await response.json();
			if (response.success) {
				setUser(response.data);

				setMessage({
					success: true,
					message: 'Account details updated!',
				});
			}
			if (!response.success) {
				setMessage({
					success: true,
					message: response.message,
				});
			}
		} catch (error) {
			setMessage({
				success: false,
				message: 'Something went wrong!',
			});
		}
	};

	const fetchUserRecipies = async () => {
		if (user) {
			try {
				let response = await fetch(`${apiURL}/recipies/myRecipies`, {
					method: 'GET',
					credentials: 'include',
				});
				response = await response.json();

				if (response.success) {
					setMyRecipies(response.data);
					setMessage({
						success: true,
						message: 'User recipies fetched successfully',
					});
				}
				if (!response.success) {
					setMessage({
						success: false,
						message: response.message,
					});
				}
			} catch (error) {
				setMyRecipies(null);
				setMessage({
					success: false,
					message: 'Something went wrong',
				});
			}
		}
	};

	const fetchAllRecipies = async () => {
		try {
			let response = await fetch(`${apiURL}/recipies/`, {
				method: 'GET',
				credentials: 'include',
			});
			response = await response.json();

			if (response.success) {
				setAllRecipies(response.data);
				setMessage({
					success: true,
					message: 'Recipies fetched successfully',
				});
			}
			if (!response.success) {
				setMessage({
					success: false,
					message: response.message,
				});
			}
		} catch (error) {
			setAllRecipies(null);
			setMessage({
				success: false,
				message: 'Something went wrong',
			});
		}
	};

	const getUserFavorites = async () => {
		if (user) {
			try {
				setLoadingFav(true);
				let response = await fetch(`${apiURL}/favorites/`, {
					method: 'GET',
					headers: {
						'Content-type': 'application/json',
					},
					credentials: 'include',
				});
				response = await response.json();
				if (response.success) {
					setUserFavorites(response.data.recipies);
				}
				setLoadingFav(false);
				if (!response.success) {
					setUserFavorites(null);
				}
			} catch (error) {
				setMessage({
					success: false,
					message: 'Something went wrong',
				});
			}
		}
	};

	const toggleFavorite = async (recipeId) => {
		if (user === null) {
			setMessage({
				success: false,
				message: 'You need to login before adding favorites',
			});
		}

		if (user) {
			setLoadingFav(true);
			try {
				let response = await fetch(`${apiURL}/favorites/toggle/${recipeId}`, {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					credentials: 'include',
				});
				response = await response.json();
				if (response.success) {
					getUserFavorites();
					setMessage({
						success: true,
						message: 'Favorites updated successfully',
					});
				}
				setLoadingFav(false);
				if (!response.success) {
					setMessage({
						success: false,
						message: response.message,
					});
				}
			} catch (error) {
				setMessage({
					success: false,
					message: 'Something went wrong',
				});
			}
		} else {
			setMessage({
				success: false,
				message: 'You need to login before adding favorites',
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				user,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
				message,
				setMessage,
				activeTab,
				setActiveTab,
				updateAccount,
				fetchUserRecipies,
				myRecipies,
				setMyRecipies,
				fetchAllRecipies,
				allRecipies,
				toggleFavorite,
				getUserFavorites,
				userFavorites,
				loadingFav,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
