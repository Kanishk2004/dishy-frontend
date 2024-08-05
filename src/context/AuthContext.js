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

			if (response.success) {
				setIsAuthenticated(true);
				setUser(response.data.user);
				setMessage({
					success: true,
					message: 'Login successfull',
				});
				router.push('/recipe');
			}
		} catch (error) {
			setMessage({
				success: false,
				message: 'Login failed - Invalid credentials',
			});
			console.log('Login failed - Invalid credentials');
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
			} else {
				console.error('Logout failed: ', response.message);
			}
		} catch (error) {
			console.log('Error: ', error);
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
		} catch (error) {
			setMessage({
				success: false,
				message: 'Something went wrong!',
			});
		}
	};

	const fetchUserRecipies = async (userId) => {
		try {
			let response = await fetch(`${apiURL}/recipies/u/${userId}`, {
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
		} catch (error) {
			setMyRecipies(null);
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
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
