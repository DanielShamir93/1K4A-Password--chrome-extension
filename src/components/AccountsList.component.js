import React, { useEffect } from "react";
import myApi from "../api/Apis";

export default function Account() {

  useEffect(() => {
    const getAllAccounts = () => {
      const GET_ALL_ACCOUNTS_END_POINT = "accounts/getAll";
      const GET_ALL_ACCOUNTS_END_POINT_CONFIG = {
        method: "get",
        headers: {
          Authorization: `Bearer ${"token"}`,
        },
      };

      try {
        myApi(GET_ALL_ACCOUNTS_END_POINT, GET_ALL_ACCOUNTS_END_POINT_CONFIG)
          .then((accountsData) => {
            console.log(accountsData)
          });
        // setAccounts(accountsData.map((account) => ({ ...account })));
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllAccounts();
  }, [])

  return (
    <div>
      <select className="accounts-dropdown">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  );
}
