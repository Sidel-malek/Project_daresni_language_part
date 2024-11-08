package com.esisba.msarabelanguage.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentAuthInfo {

    private String id;
    private String email;
    private String name ;
    private String familyname;
    private Long phone ;
    private String level;
    private int year;
    private String major;
    private String languageLevel;
    private String user;

}
