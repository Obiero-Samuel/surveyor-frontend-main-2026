import React from 'react';
import { Stepper as MuiStepper, Step, StepLabel, StepperProps as MuiStepperProps } from '@mui/material';

export interface StepperProps extends MuiStepperProps {
    steps: string[];
    activeStep: number;
    alternativeLabel?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, alternativeLabel = false, ...rest }) => {
    return (
        <MuiStepper activeStep={activeStep} alternativeLabel={alternativeLabel} {...rest}>
            {steps.map((label, index) => (
                <Step key={label} completed={activeStep > index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </MuiStepper>
    );
};

export default Stepper;
