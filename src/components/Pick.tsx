import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

export function Picks({
  steps,
  user,
  interval,
}: {
  steps: string[];
  user: string;
  interval: number;
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    setTimeout(() => {
      const increment = activeStep + 1;
      if (increment > steps.length) {
        setActiveStep(0);
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }, interval);
  });

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={steps[activeStep] !== user}
      >
        Pick
      </Button>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
