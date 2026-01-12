import React from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps, Typography, Box } from '@mui/material';

export interface SliderProps extends MuiSliderProps {
    label?: string;
    valueLabelDisplay?: 'on' | 'auto' | 'off';
}

const Slider: React.FC<SliderProps> = ({ label, valueLabelDisplay = 'auto', ...rest }) => {
    return (
        <Box sx={{ width: '100%', my: 2 }}>
            {label && (
                <Typography gutterBottom fontWeight={600}>
                    {label}
                </Typography>
            )}
            <MuiSlider valueLabelDisplay={valueLabelDisplay} {...rest} />
        </Box>
    );
};

export default Slider;
