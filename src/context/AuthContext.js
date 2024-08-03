'use client';

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
			let response = await fetch('http://localhost:8080/api/v1/users/login', {
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
				router.push('/');
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
			let response = await fetch('http://localhost:8080/api/v1/users/logout', {
				method: 'POST',
				credentials: 'include',
			});

			response = await response.json();

			if (response.success) {
				setIsAuthenticated(false);
				setUser(null);
				setMessage({
					success: true,
					message: "logging out..."
				});
				router.push('/');
			} else {
				console.error('Logout failed: ', response.message);
			}
		} catch (error) {
			console.log('Error: ', error);
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
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
