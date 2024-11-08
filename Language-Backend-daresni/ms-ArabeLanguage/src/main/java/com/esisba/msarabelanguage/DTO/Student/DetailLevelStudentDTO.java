package com.esisba.msarabelanguage.DTO.Student;

import com.esisba.msarabelanguage.entities.Class.Level;
import com.esisba.msarabelanguage.entities.Class.Step;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//for student
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailLevelStudentDTO {

    private Level level;
    private int CurrentStep;
}
