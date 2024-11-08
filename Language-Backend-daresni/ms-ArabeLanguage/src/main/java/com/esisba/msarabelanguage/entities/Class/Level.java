package com.esisba.msarabelanguage.entities.Class;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor
public class Level {

    private String name; // unique
    private List<Step> steps;
    private String examFile;



}
