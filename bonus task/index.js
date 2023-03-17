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
    birthdate: faker.date.birthdate().toLocaleDateString('ko-KR'),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

Array.from({ length: 1}).forEach(() => {
  Users.push(createRandomUser());
});

for(let i in Users){
    rl.question('Your name:', name => {
        rl.question('Your surname', surname => {
            rl.question('The date of birth:', birthdate => {
                rl.question('E-mail:', email => {
                    rl.question('Password', password => {
                        if(i === 0){
                             name;
                        }
                        if(i === 1){
                            surname;
                        }
                        if(i === 2){
                            birthdate;
                        }
                        if(i === 3){
                            email;
                        }
                        if(i === 4){
                            password;
                        }
                            
                            fs.writeFileSync("registrations.json", JSON.stringify(Users[i]));
                            console.log(chalk.green('Registration completed successfully'));
                            rl.close();
                        if(!Users[i]) {
                            console.log(chalk.red('Something is missing'));
                            rl.close();
                        }
                        rl.close();
                    });
                });
            });
        });
    });
}