import { faker } from '@faker-js/faker';

import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

import fs, { write } from 'node:fs';

import chalk from 'chalk';

const rl = readline.createInterface({ input, output });

export const Users = [];

export function createRandomUser() {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    birthdate: faker.date.birthdate(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

Array.from({ length: 1}).forEach(() => {
  Users.push(createRandomUser());
});

const userData = Users.map((info) => `${info.firstname} ${info.lastname}, ${info.birthdate.toLocaleDateString('ko-KR')}, ${info.email}, ${info.password}\n`);

rl.question('Login:', login => {
    rl.question('Password:', password => {

        if(login === 'admin' && password === '1234'){
            // rl.question('Please choose the input command: add or view', writeCommand => {
            //     if (writeCommand === 'add') {
                    fs.appendFileSync('people.txt', userData.join());
                    console.log(chalk.green('Data was successfully saved to the file'));
            //     }
            //     else if (writeCommand === 'view') {
            //         fs.readFile('people.txt', 'utf8');
            //         console.log(data);
            //     }
            // })
        } else {
            console.log(chalk.red('Invalid login details'));
        }
        rl.close();
    });
});
