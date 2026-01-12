import React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps as MuiSkeletonProps } from '@mui/material';

export interface SkeletonProps extends MuiSkeletonProps {
    variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
    width?: number | string;
    height?: number | string;
    animation?: 'pulse' | 'wave' | false;
}

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', width, height, animation = 'pulse', ...rest }) => {
    return <MuiSkeleton variant={variant} width={width} height={height} animation={animation} {...rest} />;
};

export default Skeleton;
