
Run project
git clone <>
npm install
npm i yarn
npm run start:dev || yarn start



cài đặt môi trường nest
npm i -g @nestjs/cli
yarn global add @nestjs/cli
npm i --save @nestjs/typeorm typeorm

tạo project mới
nest new project-name

test projcet
npm run test


Luồng xử lý:
Từ main -> app module (khai báo controller, service, reponse)
-> 



dto: full name = first name + last name (sử dụng @expose: trả ra, @transform: xử lý )


tạo file nhanh: 
nest g module <name>
nest g controller <name> --no-spec


validation bằng pipe 
npm install class-validator class-transformer --save
yarn add class-validator class-transformer


Notfound - NotFoundException
BadRequest - BadRequestException


Kết nối database - postgressSQL
yarn add @nestjs/typeorm typeorm pg