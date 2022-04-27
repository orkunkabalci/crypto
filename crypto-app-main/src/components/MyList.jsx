import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Select } from "antd";

import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoOrdersQuery } from "../services/binanceApi";
const { Option } = Select;
let variableArray = [];

const MyList = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [coins, setCoins] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  //  const { data: cryptoOrders } = useGetCryptoOrdersQuery(chosenCryptos[0].symbol);

  const [chosenCryptos, setChosenCryptos] = useState([]);

  function HandleChange(value) {
    const chosencoin = value;
    console.log("chosencoin", chosencoin);
    setCoins(chosencoin);
  }

  // useEffect(() => {
  //   try {
  //     setInterval(() => {
  //       asd(chosenCryptos[0].symbol);
  //     }, 3000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // function asd(crypto) {
  //   const { data: cryptoOrders } = useGetCryptoOrdersQuery(crypto);
  //   console.log(cryptoOrders);
  // }

  useEffect(() => {
    variableArray = [];
    if (coins != undefined) {
      for (let i = 0; i <= coins?.length; i++) {
        for (let x = 0; x <= cryptos?.length; x++) {
          if (
            cryptos[x]?.name.toLowerCase() == coins[i]?.toLowerCase() &&
            coins[i] != undefined
          ) {
            const variable = cryptos[x];
            console.log(variable, "variable");
            for (let z = 0; z <= variableArray.length; z++) {
              if (variableArray[z]?.name == variable?.name) {
                variableArray.slice(z, 1);
                console.log(z);
              }
            }
            variableArray.push(variable);
            console.log(variableArray, "variableArray");
          }
        }
      }
    }
    setChosenCryptos(variableArray);
    console.log(chosenCryptos, "chosencry");
  }, [coins]);

  if (isFetching) return <Loader />;

  return (
    <>
      {coins?.map((d) => (
        <p> {d} </p>
      ))}
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={HandleChange}
      >
        {cryptos?.map((a) => (
          <Option value={a.name} label={a.name}>
            <div className="demo-option-label-item">
              <p> {a.symbol} </p>
            </div>
          </Option>
        ))}
      </Select>

      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencies"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {chosenCryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/cryptos/${currency?.uuid}/${currency?.symbol}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MyList;
