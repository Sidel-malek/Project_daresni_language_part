package com.esisba.msarabelanguage.API;

import com.esisba.msarabelanguage.DTO.Admin.DetailLevelAdminDTO;
import com.esisba.msarabelanguage.DTO.Admin.StudentDTO;
import com.esisba.msarabelanguage.DTO.Admin.UpdateLevelDTO;
import com.esisba.msarabelanguage.DTO.ListLevelsDTO;
import com.esisba.msarabelanguage.entities.Class.*;
import com.esisba.msarabelanguage.fileManagement.service.IFileSytemStorage;
import com.esisba.msarabelanguage.proxies.StudentProxy;
import com.esisba.msarabelanguage.repositories.LanguageRepository;
import com.esisba.msarabelanguage.repositories.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("admin")
public class AdminController {


    private static final Logger log = LoggerFactory.getLogger(AdminController.class);
    @Autowired
    LanguageRepository languageRepository;
    @Resource
    StudentProxy studentProxy;

    @Autowired
    IFileSytemStorage fileSytemStorage;

    @Autowired
    StudentRepository studentRepository;
    private Repositories repositories;


    /************************************************** Admin **************************************************************/


@PostMapping(value = "/addLevel" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<String> addLevel(@RequestParam("level") String levelJson, @RequestParam("examFile") MultipartFile examFile) {
    ObjectMapper objectMapper = new ObjectMapper();
    DetailLevelAdminDTO levelDTO;
    try {
        levelDTO = objectMapper.readValue(levelJson, DetailLevelAdminDTO.class);
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON format");
    }

    Language language = languageRepository.findByLanguageAndLinguistic(levelDTO.getLanguage(), levelDTO.getLinguistic());

    // Check if language not exists
    if (language == null) {
        language = new Language();
        language.setLanguage(levelDTO.getLanguage());
        language.setLinguistic(levelDTO.getLinguistic());
        language.setLevels(new ArrayList<>());
        language.setStudentInfos(new ArrayList<>());
        languageRepository.save(language);
    }

    if (language.getLevels()==null){
        language.setLevels(new ArrayList<>());
    }
    // Check if a level with the same name already exists
    boolean levelExists = language.getLevels().stream()
            .anyMatch(existingLevel -> existingLevel.getName().equalsIgnoreCase(levelDTO.getName()));
    if (levelExists) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("A level with the same name already exists");
    }

    // Create and add new level
    Level level = new Level();
    level.setName(levelDTO.getName());
    level.setSteps(levelDTO.getSteps());

    // Upload exam
    String upfile = fileSytemStorage.saveFile(examFile);
    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/student/download/")
            .path(upfile)
            .toUriString();
    level.setExamFile(upfile);

    language.getLevels().add(level);
    languageRepository.save(language);

    return ResponseEntity.ok("Level added successfully");
}





    //2 get List Of Levels (All)
    @GetMapping("/levels/all")
    List<ListLevelsDTO> getlevels() {

        List<ListLevelsDTO> levelDTOs = new ArrayList<>();

        for (Language language : languageRepository.findAll()) {
            if (language.getLevels() != null) {
                for (Level level : language.getLevels()) {
                    ListLevelsDTO levelDTO = new ListLevelsDTO();
                    levelDTO.setIdLang(language.getIdLang());
                    levelDTO.setName(level.getName());
                    levelDTO.setLinguistic(language.getLinguistic());
                    levelDTO.setLanguage(language.getLanguage());
                    levelDTOs.add(levelDTO);
                }
            }
        }
        return levelDTOs;
    }


    //3 get Level
    @GetMapping("{idLang}/levels/{nameLevel}")
    public ResponseEntity<?> getLevel(@PathVariable("idLang") String idLang, @PathVariable("nameLevel") String nameLevel) {
        try {
            Language language = languageRepository.findByIdLang(idLang);

            Optional<Level> levelOptional = language.getLevels().stream()
                    .filter(levelexist -> levelexist.getName().equalsIgnoreCase(nameLevel))
                    .findFirst();

            if (!levelOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Level not found");
            }

            Level level = levelOptional.get();
            DetailLevelAdminDTO levelDTO = new DetailLevelAdminDTO();
            levelDTO.setName(level.getName());
            levelDTO.setLinguistic(language.getLinguistic());
            levelDTO.setLanguage(language.getLanguage());
            levelDTO.setExamFile(level.getExamFile());
            levelDTO.setSteps(level.getSteps());
            return ResponseEntity.ok(levelDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is not Level with this name"); // An error occurred: " + e.getMessage()
        }
    }


    //4 update (put / patch) level

    @PutMapping(value = "{idLang}/levels/{nameLevel}/update" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateLevel(@PathVariable("nameLevel") String nameLevel, @PathVariable("idLang") String idLang, @RequestParam String updatesJson , @RequestParam(required = false) MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            UpdateLevelDTO updates;
            try {
                updates = objectMapper.readValue(updatesJson, UpdateLevelDTO.class);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON format");
            }

            Language language = languageRepository.findByIdLang(idLang);

            // Check if a language  with the same name already exists
            if (!updates.getLanguage().equals(language.getLanguage()) || !updates.getLinguistic().equals(language.getLinguistic())) {
                boolean languageExists = languageRepository.existsLanguageByLanguageAndLinguistic(updates.getLanguage(), updates.getLinguistic());
                if (languageExists) { //language exist
                    Language languageExist = languageRepository.findByLanguageAndLinguistic(updates.getLanguage(), updates.getLinguistic());

                    // Check if a level with the same name already exists
                    boolean levelExists = languageExist.getLevels().stream()
                                .anyMatch(existingLevel -> existingLevel.getName().equalsIgnoreCase(updates.getName()));
                    if (levelExists) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).body("A level with the same name already exists");
                    }

                        Level newLevel = new Level();
                        newLevel.setName(updates.getName());
                        newLevel.setSteps(updates.getSteps());

                        if (file != null){ // file updated
                            // Upload exam
                            String upfile = fileSytemStorage.saveFile(file);
                            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                    .path("/student/download/")
                                    .path(upfile)
                                    .toUriString();
                            newLevel.setExamFile(upfile);
                        }else{// file not updated
                            newLevel.setExamFile(updates.getExamnFile());
                        }

                        languageExist.getLevels().add(newLevel);
                        languageRepository.save(languageExist);

                        Optional<Level> levelToRemove = language.getLevels().stream()
                                .filter(levelExist -> levelExist.getName().equalsIgnoreCase(nameLevel))
                                .findFirst();

                        if (levelToRemove.isPresent()) {
                            language.getLevels().remove(levelToRemove.get());
                            languageRepository.save(language);
                        } else {
                            System.out.println("Level not found: " + nameLevel);
                        }
                        return ResponseEntity.ok("Level updated successfully");

                } else { // language not exist
                    Language newLanguage = new Language();
                    newLanguage.setLanguage(updates.getLanguage());
                    newLanguage.setLinguistic(updates.getLinguistic());
                    Level newLevel = new Level();
                    newLevel.setName(updates.getName());
                    newLevel.setSteps(updates.getSteps());
                    if (file != null){ // file updated
                        // Upload exam
                        String upfile = fileSytemStorage.saveFile(file);
                        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                .path("/student/download/")
                                .path(upfile)
                                .toUriString();
                        newLevel.setExamFile(upfile);
                    }else{// file not updated
                        newLevel.setExamFile(updates.getExamnFile());
                    }

                    List<Level> newLevels = new ArrayList<>();
                    newLevels.add(newLevel);
                    newLanguage.setLevels(newLevels);
                    languageRepository.save(newLanguage);

                    Optional<Level> levelToRemove = language.getLevels().stream()
                            .filter(levelExist -> levelExist.getName().equalsIgnoreCase(nameLevel))
                            .findFirst();

                    if (levelToRemove.isPresent()) {
                        language.getLevels().remove(levelToRemove.get());
                        languageRepository.save(language);
                    } else {
                        System.out.println("Level not found: " + nameLevel);
                    }
                    return ResponseEntity.ok("Level updated successfully");

                }
            } else {  // language same as 1st time

                // Check if a level with the same name already exists
                if (!updates.getName().equals(nameLevel)) {
                    boolean levelExists = language.getLevels().stream()
                            .anyMatch(existingLevel -> existingLevel.getName().equalsIgnoreCase(updates.getName()));
                    if (levelExists) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).body("A level with the same name already exists");
                    }
                }
                Optional<Level> levelOptional = language.getLevels().stream()
                        .filter(levelExist -> levelExist.getName().equalsIgnoreCase(nameLevel))
                        .findFirst();

                if (!levelOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Level not found");
                }

                Level level = levelOptional.get();
                // Replace the old level with the updated one in the list
                int index = language.getLevels().indexOf(level);

                level.setName(updates.getName());
                level.setSteps(updates.getSteps());

                if (file != null){ // file updated
                    // Upload exam
                    String upfile = fileSytemStorage.saveFile(file);
                    String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/student/download/")
                            .path(upfile)
                            .toUriString();
                    level.setExamFile(upfile);
                }else{// file not updated
                    level.setExamFile(updates.getExamnFile());
                }

                language.getLevels().set(index, level);
                // Save the updated language back to the repository
                languageRepository.save(language);

                return ResponseEntity.ok("Level updated successfully");
            }


        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid update data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the level: " + e.getMessage());
        }
    }


    @PatchMapping("{idLang}/levels/{nameLevel}/update")
    public ResponseEntity<?> patchLevel(@PathVariable("nameLevel") String nameLevel, @PathVariable("idLang") String idLang, @RequestBody UpdateLevelDTO updates) {
        try {
            Language language = languageRepository.findByIdLang(idLang);
            if (language == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
            }

            Optional<Level> levelOptional = language.getLevels().stream()
                    .filter(levelExist -> levelExist.getName().equalsIgnoreCase(nameLevel))
                    .findFirst();

            if (!levelOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Level not found");
            }

            Level level = levelOptional.get();

            if (updates.getName() != null) {
                level.setName(updates.getName());
            }
            if (updates.getSteps() != null ) {
                level.setSteps(updates.getSteps());
            }
            if (updates.getExamnFile() != null ) {
                level.setExamFile(updates.getExamnFile());

            }

            // Replace the old level with the updated one in the list
            int index = language.getLevels().indexOf(level);
            language.getLevels().set(index, level);

            // Save the updated language back to the repository
            languageRepository.save(language);

            return ResponseEntity.ok("Level updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid update data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the level: " + e.getMessage());
        }
    }
     //5 liste of submissions

    @GetMapping("/{idLang}/{levelName}/submissions")
    ResponseEntity<?> getStudents(@PathVariable("idLang") String idLang , @PathVariable("levelName") String levelName ) {
        Language language = languageRepository.findByIdLang(idLang);
        if (language == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("language not found");
        }
        List<StudentInfo> studentInfos = language.getStudentInfos();
        if (studentInfos == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        Optional<Level> studentlevelOp = language.getLevels().stream()
                .filter(levelexist -> levelexist.getName().equalsIgnoreCase(levelName))
                .findFirst();
        if( !studentlevelOp.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("level not found");

        }

        Level studentlevel = studentlevelOp.get();
        List<StudentDTO> students = new ArrayList<>();
        for( StudentInfo studentInfo : studentInfos) {
            Student student = studentRepository.findByIdStudent(studentInfo.getIdStudent());
            if (studentInfo.getSolutionFile() != null && studentInfo.getCurrentLevel() == language.getLevels().indexOf(studentlevel)) {
                StudentDTO studentDTO = new StudentDTO();

                studentDTO.setIdStudent(student.getIdStudent());
                studentDTO.setEmail(student.getEmail());
                studentDTO.setLanguage(language.getLanguage());
                studentDTO.setLinguistic(language.getLinguistic());
                studentDTO.setIdLang(language.getIdLang());
                //Level level = language.getLevels().get(studentInfo.getCurrentLevel());
                studentDTO.setLevelName(levelName);
                studentDTO.setName(student.getName());
                studentDTO.setFamilyname(student.getFamilyname());
                studentDTO.setPhone(student.getPhone());
                studentDTO.setExamnSolutionPath(studentInfo.getSolutionFile());
                students.add(studentDTO);
            }
        }
        return ResponseEntity.ok(students);
    }



    //6 upgrade student level
    @PostMapping("{idLang}/submissions/{idStudent}/upgradeLevel")
    public ResponseEntity<String> upgradeLevel(@PathVariable("idStudent") String idStudent, @PathVariable("idLang") String idLang) {
        try {
            Student student = studentRepository.findByIdStudent(idStudent);
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            Language language = languageRepository.findByIdLang(idLang);
            if (language == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
            }

            List<StudentInfo> studentInfos = language.getStudentInfos();
            if (studentInfos == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student info list not found");
            }

            Optional<StudentInfo> studentInfoOp = studentInfos.stream()
                    .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(idStudent))
                    .findFirst();
            if (!studentInfoOp.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found in this language");
            }

            StudentInfo studentInfo = studentInfoOp.get();
            int currentLevel = studentInfo.getCurrentLevel();

            if ((currentLevel+1) == language.getLevels().size()) {
                // Remove student from language
                language.getStudentInfos().remove(studentInfo);
                languageRepository.save(language);


                List<String> learnedLenguages =student.getLearnedLanguage();
                if (learnedLenguages == null){
                    learnedLenguages = new ArrayList<>();
                }
                learnedLenguages.add(idLang);
                student.setLearnedLanguage(learnedLenguages);
                studentRepository.save(student);

                return ResponseEntity.ok("Student finished all levels of this language and has been removed from it");

            } else {
                // Upgrade current level in student entity
                studentInfo.setCurrentLevel(currentLevel + 1);
                studentInfo.setCurrentStep(0);
                studentInfo.setSolutionFile(null);
                int index = language.getStudentInfos().indexOf(studentInfo);
                language.getStudentInfos().set(index, studentInfo); // Replace the old entry with the updated one
                languageRepository.save(language);

                return ResponseEntity.ok("Level upgraded successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while upgrading the level: " + e.getMessage());
        }
    }






}
