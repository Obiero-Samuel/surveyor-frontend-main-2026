import React from 'react';
import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    CardActions,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface CardProps {
    title?: string;
    subtitle?: string;
    avatar?: React.ReactNode;
    media?: string;
    mediaHeight?: number;
    actions?: React.ReactNode;
    children: React.ReactNode;
    elevation?: number;
    onClick?: () => void;
    headerAction?: React.ReactNode;
    sx?: any;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    avatar,
    media,
    mediaHeight = 140,
    actions,
    children,
    elevation = 1,
    onClick,
    headerAction,
    sx,
}) => {
    return (
        <MuiCard
            elevation={elevation}
            onClick={onClick}
            sx={{
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: onClick ? 'translateY(-4px)' : 'none',
                    boxShadow: 4,
                },
                cursor: onClick ? 'pointer' : 'default',
                ...sx,
            }}
        >
            {(title || avatar || headerAction) && (
                <CardHeader
                    avatar={avatar && <Avatar>{avatar}</Avatar>}
                    action={
                        headerAction || (
                            headerAction === undefined && (
                                <IconButton aria-label="settings">
                                    <MoreVert />
                                </IconButton>
                            )
                        )
                    }
                    title={
                        title && (
                            <Typography variant="h6" fontWeight="bold">
                                {title}
                            </Typography>
                        )
                    }
                    subheader={subtitle}
                    sx={{ pb: 0 }}
                />
            )}
            {media && (
                <CardMedia
                    component="img"
                    height={mediaHeight}
                    image={media}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
            )}
            <CardContent>{children}</CardContent>
            {actions && <CardActions>{actions}</CardActions>}
        </MuiCard>
    );
};

export default Card;
