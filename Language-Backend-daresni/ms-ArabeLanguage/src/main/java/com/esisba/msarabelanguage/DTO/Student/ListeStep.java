package com.esisba.msarabelanguage.DTO.Student;

import com.esisba.msarabelanguage.entities.Class.Step;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListeStep {

    private List<Step> steps;
    private Step currentStep;
}
