import React from 'react';
import {
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
    AccordionProps as MuiAccordionProps,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionProps extends MuiAccordionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultExpanded = false, ...rest }) => {
    return (
        <MuiAccordion defaultExpanded={defaultExpanded} {...rest}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </MuiAccordion>
    );
};

export default Accordion;
