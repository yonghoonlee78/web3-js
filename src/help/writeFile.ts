import fs from 'fs';
import path from 'path';

const basePath = __dirname;
const writeFilePath = path.join(basePath, '../../account', 'account.json');

type Account = {
  chainId: string;
  account: { address: string; privateKey: string };
  balance: string;
};

export const writeFile = async (data: Account) => {
  const { chainId, account, balance } = data;
  const accountData = `{
    "chainId": "${chainId}",
    "account": {
      "address": "${account.address}",
      "privateKey": "${account.privateKey}"
    },
    "balance": "${balance}"
  }`;

  fs.writeFile(writeFilePath, accountData, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
