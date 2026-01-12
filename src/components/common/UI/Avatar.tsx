import React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

export interface AvatarProps extends MuiAvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: number;
  color?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, children, size = 40, color, sx, ...rest }) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ width: size, height: size, bgcolor: color, ...sx }}
      {...rest}
    >
      {children}
    </MuiAvatar>
  );
};

export default Avatar;
