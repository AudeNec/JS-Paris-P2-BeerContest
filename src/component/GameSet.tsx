import { useCallback, useEffect, useState } from "react";

import imageAlcoholLevel from "../assets/Beer-game-AlcoholLeve.png";
import boost from "../assets/boost.png";
import arrow from "../assets/arrow.png";

import "./GameSet.css";
import BeerCard from "./BeerCard";

import { useUserStats } from "../context/UserStats";

import { useFilteredAPI } from "../context/FilteredAPI";
import type BeerType from "../interface/BeerType";
import type UserStatsType from "../interface/UserStatsType";

interface GameSetProps {
	gameStates: { start: number; ingame: number; end: number };
	currentGameState: number;
	setCurrentGameState: React.Dispatch<React.SetStateAction<number>>;
	setAlcoholLevel: React.Dispatch<React.SetStateAction<number>>;
	alcoholLevel: number;
	alcoholLevelCategory: keyof UserStatsType;
}

function GameSet({
	currentGameState,
	gameStates,
	setCurrentGameState,
	setAlcoholLevel,
	alcoholLevel,
	alcoholLevelCategory,
}: GameSetProps) {
	const { userAssessmentScore } = useUserStats();
	const { getFilteredBeers, beersFiltered } = useFilteredAPI();

	const [beers, setBeers] = useState<BeerType[] | []>([]);
	const [decks, setDecks] = useState<{
		user: BeerType[];
		computer: BeerType[];
	}>({ user: [], computer: [] });

	const getBeers = useCallback(() => {
		fetch("http://localhost:3000/data", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setBeers(data);
			})
			.catch((error) => console.error("Erreur lors du fetch:", error));
	}, []);

	const level = useCallback((deck: BeerType[]) => {
		const deckAbv = deck.map((beer: BeerType) =>
			Number.parseFloat(beer.abv.slice(-1)),
		);
		const sumAbv = deckAbv.reduce((acc, curr) => acc + curr, 0);
		return sumAbv;
	}, []);

	const createDecks = useCallback(
		(beers: BeerType[]) => {
			const playerDeck = [];
			const computerDeck = [];
			do {
				playerDeck.length = 0;
				computerDeck.length = 0;
				for (let i = 0; i < 10; i++) {
					i < 5
						? playerDeck.push(beers[Math.floor(Math.random() * beers.length)])
						: computerDeck.push(
								beers[Math.floor(Math.random() * beers.length)],
							);
				}
				setDecks({ user: playerDeck, computer: computerDeck });
			} while (Math.abs(level(playerDeck) - level(computerDeck)) > 2);
		},
		[level],
	);

	const [boostOn, setBoostOn] = useState<boolean>(false);
	useEffect(() => {
		if (!Object.values(userAssessmentScore).every((value) => value === 0)) {
			setBoostOn(true);
		}
	}, [userAssessmentScore]);

	// Initializing the game

	useEffect(() => {
		if (Object.values(userAssessmentScore).every((value) => value === 0)) {
			getBeers();
		} else {
			getFilteredBeers();
		}
	}, [userAssessmentScore, getBeers, getFilteredBeers]);

	useEffect(() => {
		if (beersFiltered.length > 0) {
			setBeers(beersFiltered);
		}
	}, [beersFiltered]);

	useEffect(() => {
		if (beers.length > 0 && currentGameState === gameStates.ingame) {
			createDecks(beers);
		}
	}, [beers, createDecks, currentGameState, gameStates.ingame]);

	// Gameplay

	const [userCard, setUserCard] = useState<BeerType | null>(null);
	const [computerCard, setComputerCard] = useState<BeerType | null>(null);
	const [roundMsg, setRoundMsg] = useState<string | null>(null);
	const ROUND_WINNER = { computer: 0, equality: 1, user: 2 };

	const compareCard = (
		userCard: BeerType,
		computerCard: BeerType,
		ROUND_WINNER: { computer: number; equality: number; user: number },
	) => {
		const computerAbv = Number.parseFloat(computerCard.abv.replace("%", ""));
		const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));

		let roundResult: { winner: number; message: string };

		if (computerAbv === userAbv) {
			roundResult = {
				winner: ROUND_WINNER.equality,
				message: "C'est égalité !",
			};
		} else if (computerAbv < userAbv) {
			roundResult = { winner: ROUND_WINNER.computer, message: "C'est perdu !" };
		} else {
			roundResult = { winner: ROUND_WINNER.user, message: "C'est gagné !" };
		}

		return roundResult;
	};

	const updateAlcoholLevel = (winner: number, userCard: BeerType) => {
		if (winner === ROUND_WINNER.computer) {
			const userAbv = Number.parseFloat(userCard.abv.replace("%", ""));
			setAlcoholLevel((prev) => prev + userAbv);
		}
	};
	useEffect(() => {
		if (alcoholLevel >= 15) {
			setDecks((prevDecks) => ({
				user: shuffleDeck(prevDecks.user),
				computer: shuffleDeck(prevDecks.computer),
			}));
		}
	}, [alcoholLevel]);
	const shuffleDeck = (deck: BeerType[]) => {
		const shuffledDeck = [...deck];
		for (let i = shuffledDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		return shuffledDeck;
	};
	const handleUserCardSelect = (selectedCard: BeerType) => {
		const computerSelectedCard =
			decks.computer[Math.floor(Math.random() * decks.computer.length)];

		const userCardIndex = decks.user.findIndex(
			(beer) => beer.sku === selectedCard.sku,
		);
		const newUserDeck = [
			...decks.user.slice(0, userCardIndex),
			...decks.user.slice(userCardIndex + 1),
		];
		const computerCardIndex = decks.computer.findIndex(
			(beer) => beer.sku === computerSelectedCard.sku,
		);
		const newComputerDeck = [
			...decks.computer.slice(0, computerCardIndex),
			...decks.computer.slice(computerCardIndex + 1),
		];

		setDecks({ user: newUserDeck, computer: newComputerDeck });

		setUserCard(selectedCard);
		setComputerCard(computerSelectedCard);

		const roundResult = compareCard(
			selectedCard,
			computerSelectedCard,
			ROUND_WINNER,
		);
		boostOn
			? setBoostOn(false)
			: updateAlcoholLevel(roundResult.winner, selectedCard);
		setRoundMsg(roundResult.message);

		if (newUserDeck.length === 0) {
			endGame();
		}
	};

	// End of game

	const { setUserStats } = useUserStats();

	const endGame = () => {
		setCurrentGameState(gameStates.end);
		setRoundMsg(null);
		setAlcoholLevel(0);
		setComputerCard(null);
		setUserCard(null);

		setUserStats((prevStats: UserStatsType) => ({
			...prevStats,
			gamePlayed: prevStats.gamePlayed + 1,
			alcoholLevelMean: (prevStats.alcoholLevelMean + alcoholLevel) / 2,
			[alcoholLevelCategory]: prevStats[alcoholLevelCategory] + 1,
		}));
	};

	return (
		<>
			<section id="game-alcohol-level">
				<img
					src={imageAlcoholLevel}
					alt="imagealcohollevel"
					id="imagealcohollevel"
				/>
				<div id="progresse-bar">
					<div id="verticale-bar" style={{ height: alcoholLevel * 4.5 }} />
				</div>
				<div id="boost-and-progress">
					<p id="progress-alcohol-level">
						{Math.round(alcoholLevel * 10) / 10}%
					</p>
					<div id="boost">
						<img
							src={boost}
							alt="boost"
							className={boostOn ? "" : "boost-off"}
							width="20px"
						/>
						<p id="boost-description">
							Fais le test et découvre ton type de bière pour gagner un boost
						</p>
					</div>
				</div>
			</section>
			{decks.user.length === 5 ? (
				<button
					type="button"
					className="game-buttons"
					id="button-reload"
					onClick={() => createDecks(beers)}
				>
					Recharger les decks
				</button>
			) : (
				<></>
			)}
			<section className="deck" id="computer-deck">
				{decks.computer.length > 0 ? (
					decks.computer.map((beer) => {
						return (
							<BeerCard
								key={`computer ${beer.sku}-${Math.random()}`}
								beer={beer}
							/>
						);
					})
				) : (
					<></>
				)}
			</section>

			<section id="game-area">
				<div id="computer-selected-card">
					{computerCard ? <BeerCard beer={computerCard} /> : <></>}
				</div>
				<div id="user-selected-card">
					{userCard ? (
						<BeerCard beer={userCard} />
					) : (
						<>
							<h3 id="pick-card">
								Choisis une carte <br />
								<img
									src={arrow}
									alt="flèche vers le bas"
									width="60px"
									id="arrow"
								/>
							</h3>
						</>
					)}
				</div>
			</section>
			<section className="deck" id="user-deck">
				{decks.user.length > 0 ? (
					decks.user.map((beer) => {
						return (
							<BeerCard
								key={`player-${beer.sku}-${Math.random()}`}
								beer={beer}
								handleUserCardSelect={handleUserCardSelect}
							/>
						);
					})
				) : (
					<></>
				)}
			</section>
			{roundMsg ? (
				<div id="round-msg">
					<h3>{roundMsg}</h3>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default GameSet;
