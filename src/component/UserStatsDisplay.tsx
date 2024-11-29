import { useUserStats } from "../context/UserStats";

import "./UserStatsDisplay.css";

function UserStatsDisplay() {
	const { userStats, sortedType, BEER_CATEGORIES } = useUserStats();

	return (
		<article>
			<p>Nombre de parties terminées</p>
			<p>{userStats.gamePlayed}</p>
			<p>Niveau d'alcoolémie moyen par partie</p>
			<p>{Math.round(userStats.alcoholLevelMean)}</p>
			<p id="header-nb-games">Nombre de partie avec... </p>
			<p className="stats-taux">...un taux d'alcoolémie faible</p>
			<p>{userStats.gameLowAlcohol}</p>
			<p className="stats-taux">...un taux d'alcoolémie modéré</p>
			<p>{userStats.gameMiddleAlcohol}</p>
			<p className="stats-taux">...un taux d'alcoolémie élevé</p>
			<p>{userStats.gameHighAlcohol}</p>
			<div id="assessment-results">
				<h3>Le résultat de ton test:</h3>
				<ul>
					{sortedType.map((resultPerType) => (
						<li key={resultPerType[0]}>
							{BEER_CATEGORIES[resultPerType[0] as keyof typeof BEER_CATEGORIES]
								.charAt(0)
								.toUpperCase() +
								BEER_CATEGORIES[
									resultPerType[0] as keyof typeof BEER_CATEGORIES
								].slice(1)}
							: {resultPerType[1] * 10}%
						</li>
					))}
				</ul>
			</div>
		</article>
	);
}

export default UserStatsDisplay;
