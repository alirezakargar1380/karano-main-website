import { memo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';

import NavList, { CustomNavList } from './nav-list';
import { NavProps, NavGroupProps } from '../types';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          slotProps={slotProps}
        />
      ))}
    </Stack>
  );
}

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ subheader, items, slotProps }: NavGroupProps) {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list, index) => (
    <CustomNavList key={index} data={list} depth={1} slotProps={slotProps} />
  ));

  // const renderContent = items.map((list) => (
  //   <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
  // ));

  return (
    <Stack>
      {(
        renderContent
      )}
    </Stack>
  );
}
