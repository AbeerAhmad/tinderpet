import React from 'react';
import {Header, Body, Title, Right} from 'native-base';

export const Head = ({scene}) => {
  return (
    <Header style={{backgroundColor: '#eee'}}>
      <Body>
        <Title style={{color: 'black'}}>{scene.route.name}</Title>
      </Body>
      <Right />
    </Header>
  );
};
