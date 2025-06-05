import { web3 } from './0_web3.setting';

export const createAccount = () => {
  /*
        Todo: Account를 새로 생성(create) 하시기 바랍니다.
        - Web3 공식문서에서 'create'를 검색하여 기능을 구현하여 주세요.
  */
  const account = web3.eth.accounts.create();

  return {
    address: account.address,
    privateKey: account.privateKey,
  };
};

