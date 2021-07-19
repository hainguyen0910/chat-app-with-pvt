import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  return (
    <Container>
      <NotFoundDiv className="notfound">
        <div className="notfound-bg">
          <div />
          <div />
          <div />
        </div>
        <h1>oops!</h1>
        <h2>Error 404 : Page Not Found</h2>
        <Link to="/">go back</Link>
      </NotFoundDiv>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  position: relative;
  height: 100vh;
  background-color: #fafbfd;
  .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
`;

const NotFoundDiv = styled.div`
  max-width: 520px;
  width: 100%;
  text-align: center;
  .notfound-bg {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: -1;
    > div {
      width: 100%;
      background: #fff;
      border-radius: 90px;
      height: 125px;
    }
    > div:nth-child(1) {
      -webkit-box-shadow: 5px 5px 0px 0px #f3f3f3;
      box-shadow: 5px 5px 0px 0px #f3f3f3;
    }
    > div:nth-child(2) {
      -webkit-transform: scale(1.3);
      -ms-transform: scale(1.3);
      transform: scale(1.3);
      -webkit-box-shadow: 5px 5px 0px 0px #f3f3f3;
      box-shadow: 5px 5px 0px 0px #f3f3f3;
      position: relative;
      z-index: 10;
    }
    > div:nth-child(3) {
      -webkit-box-shadow: 5px 5px 0px 0px #f3f3f3;
      box-shadow: 5px 5px 0px 0px #f3f3f3;
      position: relative;
      z-index: 90;
    }
  }
  h1 {
    font-family: "Quicksand", sans-serif;
    font-size: 86px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 8px;
    color: #151515;
  }
  h2 {
    font-family: "Quicksand", sans-serif;
    font-size: 26px;
    margin: 0;
    font-weight: 700;
    color: #151515;
  }
  a {
    font-family: "Quicksand", sans-serif;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    background: #18e06f;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 5px;
    color: #fff;
    font-weight: 700;
    margin-top: 20px;
  }
`;
