package com.esisba.msarabelanguage.DTO.Student;


import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.Data;

@Data
public class languageDTO {

    private LanguageEnum language  ;
    private Linguistic linguistic ;

}
