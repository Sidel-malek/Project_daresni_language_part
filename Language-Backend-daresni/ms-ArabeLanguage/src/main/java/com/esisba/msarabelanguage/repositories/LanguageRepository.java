package com.esisba.msarabelanguage.repositories;

import com.esisba.msarabelanguage.entities.Class.Language;
import com.esisba.msarabelanguage.entities.Enum.LanguageEnum;
import com.esisba.msarabelanguage.entities.Enum.Linguistic;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LanguageRepository extends MongoRepository<Language, String> {

    Language findByLanguageAndLinguistic(LanguageEnum language, Linguistic linguistic);
    Language findByIdLang(String id);
    Boolean existsLanguageByLanguageAndLinguistic(LanguageEnum language, Linguistic linguistic);
}
