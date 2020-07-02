import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './users/user.module';
import { TodoModule } from './todos/todo.module';


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://amirghedirq:RVaeoXZ1Lrk1U9s2@cluster0-bjmuu.mongodb.net/todosList?retryWrites=true&w=majority'),
        TodoModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
