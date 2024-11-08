package com.esisba.msarabelanguage.entities.Class;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentInfo {

    private String idStudent;
    private String solutionFile;
    private int currentStep;
    private int  currentLevel;
}
