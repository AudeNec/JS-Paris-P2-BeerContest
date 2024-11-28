import { useState } from "react";

import AssessmentAnswers from "../component/AssessmentAnswers";
import AssessmentButton from "../component/AssessmentButton";
import AssessmentResult from "../component/AssessmentResults";

import assessmentContent from "../data/AssessmentContent";

import barman from "../src/assets/barman.png";

import "./Assessment.css";

function Assessment() {
	const TEST_STEPS: Record<string, number> = { startTest: 0, endTest: 11 };
	for (let i = 1; i <= 10; i++) {
		TEST_STEPS[`question${i}`] = i;
	}

	const [currentAssessmentStep, setCurrentAssessmentStep] = useState<number>(
		TEST_STEPS.startTest,
	);

	const questionKey =
		`question${currentAssessmentStep}` as keyof typeof assessmentContent;

	return (
		<main id="main-assessment">
			<img src={barman} alt="Mon personnage" className="character-image" />

			{currentAssessmentStep === TEST_STEPS.startTest ? (
				<header className="assessment-content" id="assessment-intro">
					<h1>Hello !</h1>
					<img
						src={barman}
						alt="Le barman"
						className="character-image-mobile"
					/>
					<p className="header-txt">
						Je vais te poser quelques questions pour déterminer ton deck.
					</p>
					<AssessmentButton
						setCurrentAssessmentStep={setCurrentAssessmentStep}
					/>
				</header>
			) : currentAssessmentStep === TEST_STEPS.endTest ? (
				<AssessmentResult setCurrentAssessmentStep={setCurrentAssessmentStep} />
			) : (
				<header className="assessment-content">
					<p className="header-txt">
						{assessmentContent[questionKey].question}
					</p>
					<div className="assessment-answers">
						{assessmentContent[questionKey].answer.map(
							(answer: {
								type: "golden" | "belgian" | "ale" | "ipa" | "hazy";
								sentence: string;
							}) => (
								<AssessmentAnswers
									answer={answer}
									setCurrentAssessmentStep={setCurrentAssessmentStep}
									key={answer.type}
								/>
							),
						)}
					</div>
				</header>
			)}
		</main>
	);
}
export default Assessment;
