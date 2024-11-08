package com.esisba.msarabelanguage.entities.Class;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor @NoArgsConstructor
@Document(collection = "students")
public class Student {

    @Id
    private String idStudent;
    private String email;
    private String name;
    private String familyname;
    private Long phone;
    private List<String> learnedLanguage ;

}
