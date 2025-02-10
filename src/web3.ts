import { getChainId } from './utils/1_chain.info';
import { createAccount } from './utils/2_create.account';
import { getBalance } from './utils/3_account.balance';
import { fromWei } from './utils/4_convert.balance';
import { writeFile } from './help/writeFile';

const execute = async () => {
  try {
    const chainId = (await getChainId()).toString();
    const account = createAccount();
    const balance = await getBalance(account.address);
    const convertBalance = fromWei(balance);

    await writeFile({
      chainId: chainId,
      account: account,
      balance: convertBalance,
    });
  } catch (err) {
    console.error(err);
  }
};

execute();
