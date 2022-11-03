import { useState } from "react";

const getStorageItem = <T>(key: string): T | undefined => {
	if (!window.localStorage) {
		return;
	}
	const storageValue = window.localStorage.getItem(key);
	return storageValue ? (JSON.parse(storageValue) as T) : undefined;
};

const setStorageItem = (key: string, value: unknown): void => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = <T>(
	key: string,
	initial: T
): [T, (_v: T, _f?: (_a: T) => void) => void] => {
	const [stored, setStored] = useState<T>(() => {
		try {
			return getStorageItem(key) || initial;
		} catch (error) {
			console.log(error);
			return initial;
		}
	});

	const setValue = (value: T) => {
		try {
			const valueToStore = value instanceof Function ? value(stored) : value;
			setStored(valueToStore);
			setStorageItem(key, valueToStore);
		} catch (error) {
			console.log(error);
		}
	};

	return [stored, setValue];
};
