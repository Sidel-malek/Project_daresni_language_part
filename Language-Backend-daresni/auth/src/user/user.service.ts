import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createAdminDto } from 'src/auth/DTO/CreateAdminDTO';
import { Prof } from 'src/schemas/Prof.schema';
import { Student } from 'src/schemas/Student.schema';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { UpdateProfDto } from 'src/auth/DTO/UpdateProf.dto';
import { UpdateStudentDto } from 'src/auth/DTO/UpdateStudent.dto';
import { UpdateUserDto } from 'src/auth/DTO/UpdateUser.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Prof.name) private readonly profModel: Model<Prof>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    private readonly jwtService: JwtService,
  ) {
  }
// delete prof or student by deleting user (delete cascading)
  async deleteUser(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'prof') {
      await this.profModel.deleteOne({ user: userId });
    } else if (user.role === 'student') {
      await this.studentModel.deleteOne({ user: userId });
    }

    await this.userModel.deleteOne({ _id: userId });
  }
  async getProfs(): Promise<Prof[]> {
    return this.profModel.find().populate('user').exec();
  }

  async getStudents(): Promise<Student[]> {
    return this.studentModel.find().populate('user').exec();
  }

  async createAdmin(createAdminDto: createAdminDto): Promise<User> {
    const { email, password } = createAdminDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      role: 'admin',
    });
    return newUser.save();
  }
// update prof
  async updateProf(
    profId: string,
    updateProfDto: UpdateProfDto,
  ): Promise<Prof> {
    const prof = await this.profModel.findByIdAndUpdate(profId, updateProfDto, {
      new: true,
    });
    if (!prof) {
      throw new NotFoundException('Prof not found');
    }
    return prof;
  }
  // update student
  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
    );
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
// update user (when i update the email the email of the corresponding profile will be updated too)
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password, ...rest } = updateUserDto;

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await this.userModel.findByIdAndUpdate(
      userId,
      hashedPassword ? { ...rest, password: hashedPassword } : rest,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.updateProfileEmail(userId, updateUserDto.email);

    return user;
  }

  private async updateProfileEmail(
    userId: string,
    newEmail: string,
  ): Promise<void> {
    await Promise.all([
      this.profModel.updateOne({ user: userId }, { email: newEmail }),
      this.studentModel.updateOne({ user: userId }, { email: newEmail }),
    ]);
  }
// activate prof 
  async activateProf(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, { isActive: true },{new:true});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
// search for prof by name or familyname
  async searchForProf(query: string): Promise<Prof[]> {
    const regex = new RegExp(query, 'i');

    const results = await this.profModel.find({
      $or: [{ name: regex }, { familyname: regex }],
    });

    return results;
  }
// fetch prof details for sessions
  async profDetails(token: string): Promise<any> {
    const decodedToken = this.jwtService.decode(token);
    const prof = await this.profModel
      .findOne({ user: decodedToken.id })
      .select('name familyname picture about phone email')
      .exec();

    return prof;
  }
  
}
