import api from './api';

export async function getDates() {
  const response = await api.get('/activities/dates');
  return response.data;
}

export async function getActivities() {
  const response = await api.get('/activities/');
  return response.data;
}

export async function userSelectActivity(token, activity) {
  const response = await api.post(`/activities/select/${activity}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserSelections(token) {
  const response = await api.get('/activities/select', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
