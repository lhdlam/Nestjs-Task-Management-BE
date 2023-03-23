
**Run project**
``git clone <>
npm install
npm i yarn
npm run start:dev || yarn start``



**Cài đặt môi trường nest**
npm i -g @nestjs/cli
yarn global add @nestjs/cli
npm i --save @nestjs/typeorm typeorm

-tạo project mới
nest new project-name

test projcet
npm run test



dto: full name = first name + last name (sử dụng @expose: trả ra, @transform: xử lý )


-Tạo file nhanh: 
nest g module <name>
nest g controller <name> --no-spec


-Validation bằng pipe 
npm install class-validator class-transformer --save
yarn add class-validator class-transformer


Notfound - NotFoundException
BadRequest - BadRequestException


-Kết nối database - postgressSQL
yarn add @nestjs/typeorm typeorm pg

-Kết nối với postgresSQL
config: 
   ``type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanager',
    entities: [Task],
    synchronize: true,``