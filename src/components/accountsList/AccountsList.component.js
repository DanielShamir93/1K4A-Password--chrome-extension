import React, { useEffect, useState } from "react";
import myApi from "../../api/Apis";
import Account from "../account/account.component";
import BasicButton from "../basicButton/BasicButton.component";
import BasicSelect from "../basicSelect/BasicSelect.component";

export default function AccountsList() {
  const [accounts, setAccounts] = useState([]);
  const [accountSelectedName, setAccountSelectedName] =
    useState("select-account");

  useEffect(() => {
    chrome.storage.sync.get("loggedInUser", function (result) {
      const { loggedInUser } = result;
      const GET_ALL_ACCOUNTS_END_POINT = "accounts/getAll";
      const GET_ALL_ACCOUNTS_END_POINT_CONFIG = {
        method: "get",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      };

      try {
        myApi(
          GET_ALL_ACCOUNTS_END_POINT,
          GET_ALL_ACCOUNTS_END_POINT_CONFIG
        ).then((accountsData) => {
          const { data } = accountsData;
          setAccounts(data);
        });
      } catch (err) {
        console.log(err.message);
      }
    });
  }, []);

  const logout = () => {
    const loggedInUser = {};
    chrome.storage.sync.get("loggedInUser", (data) => {
      try {
        Object.assign(loggedInUser, data.loggedInUser);

        const config = {
          method: "post",
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        };
        
        myApi("users/logout", config).then((data) => {
          console.log(data); 
        });
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  const renderAccountsDropdown = () => {
    return (
      <select
        className="accounts-dropdown"
        onChange={(e) => {
          setAccountSelectedName(e.target.value);
        }}
        value={accountSelectedName}
      >
        <option value="select-account">Select Account</option>
        {accounts.map((account) => {
          return (
            <option
              key={account._id}
              value={account._id}
            >{`${account.accountName} (${account.accountSubname})`}</option>
          );
        })}
      </select>
    );
  };

  const renderSelectedAccount = () => {
    const account =
      accounts.find((account) => account._id === accountSelectedName) || [];
    return <Account account={account} />;
  };

  return (
    <>
      <BasicButton label="Logout" variant="contained" cb={logout} />
      <BasicSelect accounts={accounts} accountSelectedName={accountSelectedName} setAccountSelectedName={setAccountSelectedName} />
      {accountSelectedName !== "select-account" && renderSelectedAccount()}
    </>
  );
}
