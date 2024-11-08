package com.esisba.msarabelanguage.DTO.Admin;

import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.Data;

@Data
public class StudentDTO {

    private String idStudent;
    private String email;
    private String name;
    private String familyname;
    private Long phone;
    private String idLang;
    private LanguageEnum language ;
    private Linguistic linguistic ;
    private String levelName ;
    private String examnSolutionPath;

}
