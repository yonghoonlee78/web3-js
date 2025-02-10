import fs from 'fs';
import path from 'path';

const basePath = __dirname;
const filePath = path.join(basePath, '../../account');
const readFileilePath = path.join(basePath, '../../account', 'account.json');

const isExist = (): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.error(err.message);
        resolve(false);
      } else {
        resolve(!(files.length === 1 && files[0] === '.gitkeep'));
      }
    });
  });
};

const readFile = async () => {
  if (await isExist()) {
    console.log('✅ Account 내용을 출력합니다:\n');

    fs.readFile(readFileilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('❌ 파일을 읽는 중 오류 발생:', err.message);
      } else {
        console.log(data);
      }
    });
  } else {
    console.log('❌ Account 파일이 없습니다. web3.ts의 기능을 구현해주세요.');
  }
};

readFile();
