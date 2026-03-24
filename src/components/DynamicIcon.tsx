import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Access the icon from the imported module
  // We need to cast to any because accessing by string index on the module isn't strictly typed
  // @ts-ignore
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Fallback icon if the name is invalid or not found
    return <LucideIcons.Smile {...props} />;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
