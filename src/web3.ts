import { web3 } from './utils/0_web3.setting'; // web3 인스턴스 임포트 추가!
import { getChainId } from './utils/1_chain.info';
import { createAccount } from './utils/2_create.account';
import { getAccountBalance } from './utils/3_account.balance';
import { fromWei } from './utils/4_convert.balance'; // 또는 './utils/fromWei'
import { writeFile } from './help/writeFile';

const execute = async () => {
  try {
    console.log("--- Web3.js 실행 시작 ---");

    // 1. Ganache 연결 및 체인 ID 확인
    try {
      const networkId = await web3.eth.net.getId(); // 네트워크 ID 확인 (선택 사항이지만 연결 확인에 도움)
      console.log(`\n✅ Web3.js가 네트워크 ID ${networkId}에 연결되었습니다 (Ganache).`);
    } catch (error) {
      console.error("❌ Ganache 연결 실패:", error);
      console.error("Ganache가 실행 중인지, 0_web3.setting.ts의 RPC 주소가 올바른지 확인해주세요.");
      return; // 연결 실패 시 더 이상 진행하지 않음
    }

    // 1-1. 체인 ID 가져오기
    const chainId = (await getChainId()).toString();
    console.log(`✅ 연결된 체인 ID: ${chainId}`);

    // 2. 새로운 계정 생성 (선택 사항: Ganache 잔액 확인이 주 목적이라면)
    const newCreatedAccount = createAccount();
    console.log(`\n--- 새 계정 생성 완료 ---`);
    console.log(`  주소: ${newCreatedAccount.address}`);
    // console.log(`  개인 키: ${newCreatedAccount.privateKey}`); // 개인 키는 보안상 출력 주의
    
   const ganacheTargetAddress = '0x594A3627C5b59C1a214C8B8100484a0c0556b63f'; // 👈 직접 복사한 주소 그대로 사용

   if (!web3.utils.isAddress(ganacheTargetAddress)) {
    console.error(`\n❌ 오류: '${ganacheTargetAddress}'는 유효한 이더리움 주소가 아닙니다.`);
    console.error("Ganache GUI에서 주소를 다시 정확히 복사했는지, 또는 다른 문제가 있는지 확인해주세요.");
    return; 
}

    console.log(`\n--- Ganache 계정 (${ganacheTargetAddress}) 잔액 조회 ---`);
    const ganacheRawBalance = await getAccountBalance(ganacheTargetAddress);
    console.log(`  조회된 잔액 (Wei): ${ganacheRawBalance}`);

    // 5. Wei 단위를 Ether로 변환합니다.
    const ganacheEtherBalance = fromWei(ganacheRawBalance);
    console.log(`  변환된 잔액 (ETH): ${ganacheEtherBalance} ETH`);

    // 6. 결과 파일 저장
    await writeFile({
      chainId: chainId,
      account: {
        address: ganacheTargetAddress,
        privateKey: "N/A (Managed by Ganache)"
      },
      balance: ganacheEtherBalance,
    });

    console.log("\n✅ 모든 작업이 성공적으로 완료되었습니다!");
    console.log("결과가 output.json 파일에 저장되었을 수 있습니다.");

  } catch (err) {
    console.error("\n❌ 오류가 발생했습니다:");
    console.error(err);
  }
};

execute();
