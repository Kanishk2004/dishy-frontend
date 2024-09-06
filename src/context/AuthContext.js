'use client';

import { apiURL } from '@/Constant';
import { useRouter } from 'next/navigation';
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);

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
				router.push('/');
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
			let response = await fetch(`${apiURL}/users/me`, {
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
					success: false,
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

	const deleteAccount = async (password) => {
		try {
			let response = await fetch(`${apiURL}/users/me`, {
				method: 'DELETE',
				body: JSON.stringify({
					password,
				}),
				headers: {
					'Content-type': 'application/json',
				},
				credentials: 'include',
			});

			response = await response.json();
			if (response.success) {
				setMessage({
					success: true,
					message: response.message,
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
				message: 'Something went wrong!',
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
				updateAccount,
				deleteAccount,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
