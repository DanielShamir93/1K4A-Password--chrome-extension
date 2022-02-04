import React, { useEffect, useState } from "react";
import myApi from "../../api/Apis";

export default function AccountsList() {

  const [accounts, setAccounts] = useState([]);

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
    return accounts.map((account) => {
      return (
        <option key={account._id} value={account.accountName}>{account.accountName}</option>
      );
    });
  }

  return (
    <div>
      <select className="accounts-dropdown">
        {renderAccountsDropdown()}
      </select>
    </div>
  );
}
