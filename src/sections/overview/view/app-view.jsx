import { useState,useEffect,  } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentSubject from '../app-current-subject';

export default function AppView() {
  const [users, setUsers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const fetchData = async () => {
    try {
      const [usersResponse, answersResponse] = await Promise.all([
        fetch('http://localhost:5000/users/non-admin'),
        fetch('http://localhost:5000/answers'),
      ]);

      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }
      if (!answersResponse.ok) {
        throw new Error('Failed to fetch answers');
      }

      const usersData = await usersResponse.json();
      const answersData = await answersResponse.json();

      const formattedUsers = usersData.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));

      setUsers(formattedUsers);
      setAnswers(answersData);

      console.log(formattedUsers.length);
      console.log(formattedUsers);
      console.log(answersData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={users.length}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Submitted Answers"
            total={answers.length}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4} />

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Diverse Personality"
            chart={{
              categories: [
                'The Loyalist',
                'The Challenger',
                'The Enthusiast',
                'The Individualist',
                'The Achiever',
                'The Reformer',
                'The Helper',
                'The Peacemaker',
                'The Investigator',
              ],
              series: [{ name: 'User', data: [80, 50, 30, 40, 100, 20] }],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="User Results"
            chart={{
              series: [
                { label: 'The Loyalist', value: 4344 },
                { label: 'The Challenger', value: 4344 },
                { label: 'The Enthusiast', value: 4344 },
                { label: 'The Individualist', value: 4344 },
                { label: 'The Achiever', value: 4344 },
                { label: 'The Reformer', value: 4344 },
                { label: 'The Helper', value: 5435 },
                { label: 'The Peacemaker', value: 1443 },
                { label: 'The Investigator', value: 4443 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
