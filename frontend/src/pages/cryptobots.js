import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark as fasFaCross } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as fasFaCircle } from "@fortawesome/free-solid-svg-icons";
import TokenService from "../services/token.service";
import BotService from "../services/bot.service";
import { useNavigate } from "react-router-dom";
const CryptoBots = () => {
  const [active, setActive] = useState(true);
  const [values, setValues] = useState({ public: "", secret: "" });
  const [publicError, setPublicError] = useState("");
  const [secretError, setSecretError] = useState("");
  let navigate = useNavigate();
  const handleChange = (event) => {
    event.persist();
    setPublicError("");
    setSecretError("");
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    const user = TokenService.getUser();
    if (user != null) {
      BotService.getBot(user?.userId).then(
        (response) => {
          console.log("response", response);
          if (response.status === 200) {
            setValues({
              public: response?.data?.cryptoPair,
              secret: response.data.strategy,
            });
            setActive(response?.data?.isPredefined);
          }
        },
        (error) => {}
      );
    } else {
      navigate("/sign-in");
    }
  }, []);

  const submitBotValues = (from) => {
    console.log(values?.public.length);
    if (from === "start") {
      if (values?.public.length === 0) {
        setPublicError("Must Required.");
        return false;
      } else if (values?.secret.length === 0) {
        setSecretError("Must Required.");
        return false;
      } else {
        const user = TokenService.getUser();
        console.log("User", user);
        BotService.addBot(
          values?.public,
          values?.secret,
          user.userId,
          true
        ).then(
          (response) => {
            setActive(true);
            setPublicError("");
            setSecretError("");
          },
          (error) => {}
        );
      }
    } else {
      if (values?.public.length === 0) {
        setPublicError("Must Required.");
        return false;
      } else if (values?.secret.length === 0) {
        setSecretError("Must Required.");
        return false;
      } else {
        const user = TokenService.getUser();
        console.log("User", user);
        BotService.addBot(
          values?.public,
          values?.secret,
          user.userId,
          false
        ).then(
          (response) => {
            setActive(false);
            setPublicError("");
            setSecretError("");
          },
          (error) => {}
        );
      }
    }
    console.log("Values Submitted", values);
  };
  return (
    <div className="row" style={{ marginTop: "7%" }}>
      <div className="col-md-2   offset-md-2">
        <img
          src={require(`../images/bot-trade.png`)}
          width={"100%"}
          height={"200px"}
        />
      </div>
      <div className="col-md-8 ">
        <div className="row mt-5">
          <div className="col-md-3 ">
            {" "}
            <div className="d-flex  align-items-center">
              <FontAwesomeIcon
                icon={!active ? fasFaCross : fasFaCircle}
                style={{
                  fontSize: "50px",
                  color: `${!active ? "#c71a1a" : "#26821f"}`,
                  paddingRight: "3%",
                }}
              />

              <span className="pr-3">{active ? "Active" : "InActive"}</span>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <input
              type="text"
              name="public"
              onChange={handleChange}
              value={values.public || ""}
              className="form-control"
            />
            <div className="text-danger p-2">{publicError}</div>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="secret"
              onChange={handleChange}
              value={values.secret || ""}
              className="form-control"
            />
            <div className="text-danger p-2">{secretError}</div>
          </div>
          <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
            {" "}
            {!active ? (
              <div
                className="btn"
                style={{
                  width: "200px",
                  backgroundColor: "#83bdf7",
                  color: "white",
                }}
                onClick={() => {
                  submitBotValues("start");
                }}
              >
                start Bot
              </div>
            ) : (
              <div
                className="btn"
                style={{
                  width: "200px",
                  backgroundColor: "#83bdf7",
                  color: "white",
                }}
                onClick={() => {
                  submitBotValues("stop");
                }}
              >
                Stop Bot
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoBots;
