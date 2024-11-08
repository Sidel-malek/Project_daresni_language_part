package com.esisba.msarabelanguage.DTO;

import com.esisba.msarabelanguage.entities.Class.Step;
import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LanguageDTO {
    private String idLang ;
    private LanguageEnum language;
    private Linguistic linguistic ;
    private String levelName ;
    private int currentStep ;
}
