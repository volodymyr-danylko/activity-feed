import { Container, Stack } from '@mui/material';
import { useAppSelector } from './redux/store';

import { getActivities } from './redux/selectors';
import { ActivityList } from './components/activity-list';
import { Form } from './components/form';

const App = () => {
  const activities = useAppSelector(getActivities);

  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Stack spacing={2} sx={{ px: 0 }}>
        <Form />
        <ActivityList {...{ activities }} />
      </Stack>
    </Container>
  );
};

export default App;
