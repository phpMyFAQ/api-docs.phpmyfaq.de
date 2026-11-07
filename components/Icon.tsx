import React from 'react';
import { icons, IconName } from './icons';

interface IconProps {
  name: IconName;
  className?: string;
  // Text for assistive technology. Without it the icon is decorative and hidden.
  label?: string;
}

// Inline SVG icon that sizes and colours itself like the surrounding text.
export default function Icon({ name, className, label }: IconProps): React.ReactElement {
  const icon = icons[name];
  return (
    <svg
      viewBox={icon.viewBox}
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      style={{ display: 'inline-block', verticalAlign: '-0.125em' }}
    >
      {label && <title>{label}</title>}
      <path d={icon.path} />
    </svg>
  );
}
