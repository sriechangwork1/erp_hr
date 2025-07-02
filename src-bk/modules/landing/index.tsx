'use client';
import React from 'react';
import Header from './Header';
import Content from './Content';

const Landing = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      {/*<Link rel='stylesheet' href='/signin'>*/}
      {/*  Sign In*/}
      {/*</Link>*/}
      <Header />
      <Content />
    </div>
  );
};

export default Landing;
