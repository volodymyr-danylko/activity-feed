import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import PersonIcon from '@mui/icons-material/Person';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import { TextField, Button, Radio, Stack, Paper } from '@mui/material';
import { addActivity } from '@/redux/slice';
import { useAppDispatch } from '@/redux/store';
import { ChangeEvent, useState } from 'react';

const OPTIONS = [
  { value: 'message', icon: <ChatBubbleIcon />, checkedIcon: <ChatBubbleIcon /> },
  { value: 'phone', icon: <PhoneEnabledIcon />, checkedIcon: <PhoneEnabledIcon /> },
  { value: 'coffe', icon: <LocalCafeIcon />, checkedIcon: <LocalCafeIcon /> },
  { value: 'beer', icon: <SportsBarIcon />, checkedIcon: <SportsBarIcon /> },
  { value: 'meeting', icon: <PersonIcon />, checkedIcon: <PersonIcon /> },
];

export const Form = () => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState('message');
  const [note, setNote] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const onSubmit = () => {
    dispatch(
      addActivity({
        type,
        note,
      }),
    );

    setNote('');
  };

  return (
    <Paper elevation={0} sx={{ backgroundColor: '#efefef', p: 1 }}>
      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Add your note"
        multiline
        rows={4}
        value={note}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setNote(event.target.value);
        }}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="row" spacing={2}>
          {OPTIONS.map((item, index) => (
            <Radio key={index} checked={type === item.value} onChange={handleChange} {...item} />
          ))}
        </Stack>
        <Button size="small" variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};
