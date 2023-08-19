import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "../dto/create-Question.dto";
import { QuestionRepository } from "../repositories/question.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "../entities/question.entity";
import { Quiz } from "../entities/quiz.entity";

@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
    ){}

    async createQuestion(question: CreateQuestionDto,quiz: Quiz):Promise<Question>{
        const newQuestion = await this.questionRepository.save({
            question:question.question
        });
        quiz.questions = [...quiz.questions,newQuestion];
        await quiz.save();
        return newQuestion;
    }
}