import React from "react";
import { Button } from 'reactstrap';
import Stocks from '../components/Stocks'

function Home() {
  return (
    <div>
    <h1>Homepage</h1>
    <Button color="danger">Home</Button>
    <Stocks />
    </div>
  );
}

export default Home;