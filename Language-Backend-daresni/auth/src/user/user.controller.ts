import {  BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/User.schema';
import { Prof } from 'src/schemas/Prof.schema';
import { Student } from 'src/schemas/Student.schema';
import { createAdminDto } from 'src/auth/DTO/CreateAdminDTO';
import { AdminGuard } from 'src/Guards/AdminGuard';
import { UpdateProfDto } from 'src/auth/DTO/UpdateProf.dto';
import { UpdateStudentDto } from 'src/auth/DTO/UpdateStudent.dto';

import { Request } from 'express';
import { UpdateUserDto } from 'src/auth/DTO/UpdateUser.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    // delete prof or student (starting from user)
    @UseGuards(AdminGuard)
    @Delete(':id')
    async deleteUser(@Param('id') userId: string): Promise<void> {
      await this.userService.deleteUser(userId);
    }
    // get all profs
    //@UseGuards(AdminGuard)
    @Get('profs')
    async getProfs(): Promise<Prof[]> {
      return this.userService.getProfs();
    }

    // get all students
    @UseGuards(AdminGuard)
    @Get('students')
    async getStudents(): Promise<Student[]> {
      return this.userService.getStudents();
    }
    // create admin account
    @Post('admin')
    async createAdmin(@Body() createAdminDto: createAdminDto): Promise<User> {
      return this.userService.createAdmin(createAdminDto);
    }
    //update prof
    @Put('prof/:id')
    async updateProf(@Param('id') profId: string, @Body() updateProfDto: UpdateProfDto): Promise<Prof> {
      return this.userService.updateProf(profId, updateProfDto);
    }
    // update student
    @Put('student/:id')
    async updateStudent(@Param('id') studentId: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
      return this.userService.updateStudent(studentId, updateStudentDto);
    }
    //update user
    @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto);
  }
  
  //Activate prof account by admin
  @UseGuards(AdminGuard)
  @Patch(':id/activate')
  async activateProf(@Param('id') id: string) {
    return this.userService.activateProf(id);
  }

//search for profs by name or familyname
  @Get('/search')
  async searchByNameOrFamilyName(@Query('query') query: string) {
    const results = await this.userService.searchForProf(query);
    return results;
  }

 // get prof informations for sessions
  @Get('prof-info')
  async getProf(@Req() request: Request): Promise<any> {
    const token = request.headers.authorization;
    if (!token) {
      throw new NotFoundException('token is missing');
    }

    return await this.userService.profDetails(token);
  }


}
