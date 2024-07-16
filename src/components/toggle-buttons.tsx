import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function ToggleButtons({
  display,
  setDisplay,
}: {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <ToggleButtonGroup color="primary" value={display} exclusive onChange={(e, value) => setDisplay(value)}>
      <ToggleButton value="chart">Chart</ToggleButton>
      <ToggleButton value="table">Table</ToggleButton>
    </ToggleButtonGroup>
  );
}
