import { ActivitiesItem, removeActivity } from '@/redux/slice';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { RelativeTime } from '../relative-time';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@/redux/store';

type ActivityListProps = { activities: ActivitiesItem[] };

export const ActivityList: FC<ActivityListProps> = ({ activities }) => {
  const dispatch = useAppDispatch();

  const onRemoveActivity = (id: string) => {
    dispatch(removeActivity(id));
  };

  return (
    <Stack spacing={2} component="ul" sx={{ px: 0 }}>
      {activities.map((item) => (
        <Paper key={item.id} elevation={0} sx={{ backgroundColor: '#efefef', p: 1 }} component="li">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack gap={1} my={2}>
              <Typography variant="h5">You {Heading[item.type]} Milton</Typography>
              <Typography variant="body2" component="p">
                {item.note}
              </Typography>
            </Stack>

            <RelativeTime value={item.date} />
            <IconButton onClick={() => onRemoveActivity(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

enum Heading {
  message = 'added tote to',
  phone = 'had a call with',
  coffe = 'had a coffe with',
  beer = 'had a beer with',
  meeting = 'had a meeting with',
}
