import React, { useEffect } from "react";
import CardComponent from "../components/card";
import UserService from "../services/user.service";
const Home = () => {
  return (
    <div>
      <div className="row" style={{ marginTop: "5%" }}>
        <div className="col-8 offset-2">
          <div className="row">
            <h2 className="text-center">
              You don't to be an expert to earn money buying crypto! Our bots
              will do it for you!
            </h2>
          </div>
          <p className="">
            Our bots are the future of the stock market game. Do not let your
            money just lie in your account, invest and see how your account
            balance grows day by day.You don't need to be familiar with crypto
            currencies or the stock market, our bots will help get rich.If you
            are not sure and you are afraid of losses. we have prepared a
            simulation that will dispel your doubts.Any delay in money wasted
            that could have been yours!
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col offset-2">
          <h2>Beginner's guide</h2>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-2 col-md-4 col-sm-5 col-xs-8 offset-md-2 mb-4">
          <CardComponent
            title={"How to buy my first bot?"}
            imageSrc={"credit-card.png"}
          />
        </div>
        <div className="col-lg-2 col-md-4 col-sm-5 col-xs-8">
          <CardComponent
            title={"Check out bots in actions!"}
            imageSrc={"bot-trade.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
