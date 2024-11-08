package com.esisba.msarabelanguage.repositories;

import com.esisba.msarabelanguage.entities.Class.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface StudentRepository extends MongoRepository<Student, String> {

    Student findByIdStudent(String id);

}
