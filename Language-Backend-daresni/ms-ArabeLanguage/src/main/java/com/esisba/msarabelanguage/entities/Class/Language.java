package com.esisba.msarabelanguage.entities.Class;

import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Language" )
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Language {
    @Id
    private String idLang;
    private Linguistic linguistic;
    private LanguageEnum language ;
    private List<Level> levels ;
    private List<StudentInfo> studentInfos ;

}
