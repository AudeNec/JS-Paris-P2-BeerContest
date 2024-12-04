import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

import { useUserStats } from "./UserStats";

import type BeerType from "../interface/BeerType";

interface filterBeersPerTypeProps {
	arrayOfBeers: BeerType[];
}

interface FilteredAPIType {
	getFilteredBeers: () => void;
	beersFiltered: BeerType[] | [];
}

const FilteredAPI = createContext<FilteredAPIType | null>(null);

export function FilteredAPIProvider({ children }: { children: ReactNode }) {
	const { userMaxKey } = useUserStats();

	const [beersFiltered, setBeersFiltered] = useState<BeerType[] | []>([]);

	const filterBeersPerType = useCallback(
		({ arrayOfBeers }: filterBeersPerTypeProps) => {
			let filteredArray = [];
			if (userMaxKey === "golden") {
				filteredArray = arrayOfBeers.filter((beer: BeerType) =>
					beer.sub_category_2?.includes("Golden"),
				);
			} else if (userMaxKey === "belgian") {
				filteredArray = arrayOfBeers.filter((beer: BeerType) =>
					beer.sub_category_2?.includes("Belgian"),
				);
			} else if (userMaxKey === "ale") {
				filteredArray = arrayOfBeers.filter(
					(beer: BeerType) =>
						beer.sub_category_2 === undefined ||
						beer.sub_category_2.includes("Pilsner") ||
						beer.sub_category_2.includes("Brown Ale") ||
						beer.sub_category_2.includes("Cream Ale"),
				);
			} else if (userMaxKey === "ipa") {
				filteredArray = arrayOfBeers.filter((beer: BeerType) =>
					beer.sub_category_2?.includes("IPA"),
				);
			} else {
				filteredArray = arrayOfBeers.filter((beer: BeerType) =>
					beer.sub_category_3?.includes("Hazy"),
				);
			}
			return filteredArray;
		},
		[userMaxKey],
	);

	const getFilteredBeers = useCallback(() => {
		fetch("https://beer-contest.vercel.app/db.json", {
			method: "GET",
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data: { code: number; error: false; data: BeerType[] }) => {
				setBeersFiltered(filterBeersPerType({ arrayOfBeers: data.data }));
			})
			.catch((error) => console.error("Erreur lors du fetch:", error));
	}, [filterBeersPerType]);

	return (
		<FilteredAPI.Provider value={{ getFilteredBeers, beersFiltered }}>
			{children}
		</FilteredAPI.Provider>
	);
}

export const useFilteredAPI = () => {
	const value = useContext(FilteredAPI);
	if (value == null) {
		throw new Error(
			"useFilteredAPI has to be used within <FilteredAPIProvider>",
		);
	}

	return value;
};
