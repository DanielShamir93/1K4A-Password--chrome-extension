import React, { useEffect, useState } from "react";
import myApi from "../../api/Apis";
import Account from "../account/account.component";

export default function AccountsList() {

  const [accounts, setAccounts] = useState([]);
  const [accountSelected, setAccountSelected] = useState({});

  useEffect(() => {
    chrome.storage.sync.get("loggedInUser", function(result) {
      const { loggedInUser } = result
      const GET_ALL_ACCOUNTS_END_POINT = "accounts/getAll";
      const GET_ALL_ACCOUNTS_END_POINT_CONFIG = {
        method: "get",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };

      try {
        myApi(GET_ALL_ACCOUNTS_END_POINT, GET_ALL_ACCOUNTS_END_POINT_CONFIG)
          .then((accountsData) => {
            const { data } = accountsData;
            setAccounts(data);
          });
      } catch (err) {
        console.log(err.message);
      }
    });

  }, [])

  const renderAccountsDropdown = () => {
    return (
      <select 
        className="accounts-dropdown"
        onChange={(e) => {setAccountSelected(e.target.value)}}
        value={accountSelected}
      >
        {accounts.map((account) => {
          return (
            <option key={account._id} value={account._id}>{account.accountName}</option>
          );
        })}
      </select>
    )
  }

  const renderSelectedAccount = () => {
    const account = accounts.filter((account) => account._id === accountSelected);
    console.log(account)
    return <Account account={account} />
  }

  return (
    <div>
      {renderAccountsDropdown()}
      {renderSelectedAccount()}
    </div>
  );
}
