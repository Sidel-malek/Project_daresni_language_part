package com.esisba.msarabelanguage.DTO.Admin;

import com.esisba.msarabelanguage.entities.Class.Step;
import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.Data;

import java.util.List;

@Data
public class UpdateLevelDTO {

    private LanguageEnum language;
    private Linguistic linguistic;
    private String name;
    private List<Step> steps;
    private String examnFile;
}
