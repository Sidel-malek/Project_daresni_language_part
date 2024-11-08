package com.esisba.msarabelanguage.entities.Projection;

import com.esisba.msarabelanguage.entities.Class.Level;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "pr1" , types = Level.class)
public interface LevelProjection {


    public String getName();
    public String getLinguistic();
    public String getExamn();


}
