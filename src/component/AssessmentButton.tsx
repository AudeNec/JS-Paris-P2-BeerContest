import "./AssessmentButton.css";

import question from "../src/assets/picto-test.png";

interface AssessmentButtonProps {
	setCurrentAssessmentStep: React.Dispatch<React.SetStateAction<number>>;
}

const AssessmentButton = ({
	setCurrentAssessmentStep,
}: AssessmentButtonProps) => {
	return (
		<button
			type="button"
			id="assessment-button"
			onClick={() => setCurrentAssessmentStep(1)}
		>
			<p>Commencer le test</p>
			<img src={question} alt="point d'interrogation" />
		</button>
	);
};

export default AssessmentButton;
