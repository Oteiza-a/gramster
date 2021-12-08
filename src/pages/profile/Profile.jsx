import React from 'react';
import { useParams } from 'react-router-dom'

export function Profile() {

  const { userId } = useParams()

  return (
    <div>
      Profile Page. User id: {userId}
    </div>
  );
}