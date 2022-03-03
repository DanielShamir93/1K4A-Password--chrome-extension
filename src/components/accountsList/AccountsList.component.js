import React, { useEffect, useState } from "react";
import myApi from "../../api/Apis";
import Account from "../account/account.component";
import BasicButton from "../basicButton/BasicButton.component";
import BasicSelect from "../basicSelect/BasicSelect.component";
import "./accountsList.styles.scss";

export default function AccountsList() {
  const [accounts, setAccounts] = useState([]);
  const [accountSelectedName, setAccountSelectedName] = useState("");

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

        myApi("users/logout", config).then(() => {
          window.location.reload();
        });
      } catch (err) {
        console.log(err.message);
      }
    });
  };

  const renderSelectedAccount = () => {
    const account = accounts.find((account) => account._id === accountSelectedName) || [];
    return <Account account={account} />;
  };

  return (
    <div className='Account-list'>
      <BasicButton
        className='logout-button'
        label='Logout'
        variant='contained'
        cb={logout}
      />
      <div className='accounts-list-content'>
        <BasicSelect
          className='accounts-dropdown'
          accounts={accounts}
          accountSelectedName={accountSelectedName}
          setAccountSelectedName={setAccountSelectedName}
        />
        {accountSelectedName !== "" && renderSelectedAccount()}
      </div>
    </div>
  );
}
