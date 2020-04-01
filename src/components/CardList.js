import React from 'react';
import Card from './Card';

//use 'props' or destructuring to get 'robots'
const CardList = ({ robots }) => {
  // if (true) {
  //   throw new Error("aaahhhh");
  // }
  return (
    <div>
      {robots.map((user) => {
        return <Card key={user.id} id={user.id} name={user.name} email={user.email} />
      })}
    </div>
  )
}

export default CardList;