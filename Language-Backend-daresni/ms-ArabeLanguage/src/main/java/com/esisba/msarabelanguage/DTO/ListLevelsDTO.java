package com.esisba.msarabelanguage.DTO;

import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.Data;


@Data
public class ListLevelsDTO {

    private String idLang;
    private String name;
    private Linguistic linguistic;
    private LanguageEnum language;

}

