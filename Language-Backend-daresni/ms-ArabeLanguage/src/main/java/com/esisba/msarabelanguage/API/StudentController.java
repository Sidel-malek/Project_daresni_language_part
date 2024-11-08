package com.esisba.msarabelanguage.API;

import com.esisba.msarabelanguage.DTO.LanguageDTO;
import com.esisba.msarabelanguage.DTO.StepDTO;
import com.esisba.msarabelanguage.DTO.Student.DetailLevelStudentDTO;
import com.esisba.msarabelanguage.DTO.Student.ListeStep;
import com.esisba.msarabelanguage.entities.Class.*;
import com.esisba.msarabelanguage.fileManagement.service.IFileSytemStorage;
import com.esisba.msarabelanguage.models.StudentAuth;
import com.esisba.msarabelanguage.models.StudentAuthInfo;
import com.esisba.msarabelanguage.proxies.StudentProxy;
import com.esisba.msarabelanguage.repositories.LanguageRepository;
import com.esisba.msarabelanguage.repositories.StudentRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;



@RestController
@RequestMapping("student")
public class StudentController {


    @Autowired
    LanguageRepository languageRepository;

    @Resource
    StudentProxy studentProxy;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    IFileSytemStorage fileSytemStorage;
    /************************************************** Student **************************************************************/

    //0 Get languages have levels
    @GetMapping("/languages")
    public List<LanguageDTO> availableLanguages (@RequestHeader("Authorization") String token){
        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        List<LanguageDTO> languages = new ArrayList<>();
        for(Language language : languageRepository.findAll()){
            if (language.getLevels() != null && !language.getLevels().isEmpty()) {
                LanguageDTO languageDTO = new LanguageDTO();

                Optional<StudentInfo> StudentInfoOp = language.getStudentInfos().stream()
                        .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(studentAuth.getId()))
                        .findFirst();
                if (StudentInfoOp.isPresent()) {
                    StudentInfo studentInfo = StudentInfoOp.get();
                    languageDTO.setLevelName(language.getLevels().get( studentInfo.getCurrentLevel()).getName());
                    languageDTO.setCurrentStep(studentInfo.getCurrentStep());
                }else{
                    languageDTO.setLevelName(language.getLevels().get(0).getName());
                    languageDTO.setCurrentStep(0);

                }
                languageDTO.setIdLang(language.getIdLang());
                languageDTO.setLanguage(language.getLanguage());
                languageDTO.setLinguistic(language.getLinguistic());
                languages.add(languageDTO);
            }
        }

        return languages ;
    }

    //1 verify if student exist
    @GetMapping("/isStudentIAL")
    Boolean isStudentIAL(@RequestHeader("Authorization") String token) {
        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        return studentRepository.existsById(studentAuth.getId());

    }


    //2  inscription of student in language level (learn)
    @PostMapping("/{idLang}/inscription")
    ResponseEntity<?> ArabeInscription( @PathVariable("idLang") String idLang,@RequestHeader("Authorization") String token) {

        Language language = languageRepository.findByIdLang(idLang);

        if( language.getLevels() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There is no level in this language");
        }

        Student student;
        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        StudentAuthInfo studentAuthInfo = studentProxy.getEtudiantInfo(token);

        List<StudentInfo> studentInfos = language.getStudentInfos();

        if (studentInfos == null ) {
            studentInfos = new ArrayList<>();
        }

        Optional<StudentInfo> StudentInfoOp = studentInfos.stream()
                .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(studentAuth.getId()))
                .findFirst();


        if (StudentInfoOp.isPresent()) {

            StudentInfo StudentInfo = StudentInfoOp.get();
            int CurrentLevel = StudentInfo.getCurrentLevel();
            Level level = language.getLevels().get(CurrentLevel);

            ListeStep listeStep = new ListeStep(level.getSteps(),level.getSteps().get(StudentInfo.getCurrentStep()) );
            return ResponseEntity.ok(listeStep);

        } else {
            if (!studentRepository.existsById(studentAuth.getId())) {
                student = new Student();
                student.setIdStudent(studentAuth.getId());
                student.setEmail(studentAuth.getEmail());
                student.setFamilyname(studentAuthInfo.getFamilyname());
                student.setName(studentAuthInfo.getName());
                student.setPhone(studentAuthInfo.getPhone());
                studentRepository.save(student);
            }


            studentInfos.add(new StudentInfo(studentAuth.getId(),null, 0,0));
            language.setStudentInfos(studentInfos);
            languageRepository.save(language);
            Level level = language.getLevels().get(0);
            ListeStep listeStep = new ListeStep(level.getSteps(),level.getSteps().get(0) );
            return ResponseEntity.ok(listeStep);

        }
    }

    //3 next Step
    @PostMapping("/{langId}/{indexStep}/upgradeStep")
    public ResponseEntity<?> upgradeStep(@RequestHeader("Authorization") String token, @PathVariable("indexStep") int indexStep, @PathVariable("langId") String langId) {
        try {
            Language language = languageRepository.findByIdLang(langId);
            if (language == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
            }

            StudentAuth studentAuth = studentProxy.getEtudiant(token);
            List<StudentInfo> studentInfos = language.getStudentInfos();

            if (studentInfos == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student info list not found");
            }

            Optional<StudentInfo> studentInfoOp = studentInfos.stream()
                    .filter(info -> info.getIdStudent().equalsIgnoreCase(studentAuth.getId()))
                    .findFirst();

            if (!studentInfoOp.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            StudentInfo studentInfo = studentInfoOp.get();
            int currentStep = studentInfo.getCurrentStep();
            int currentLevel = studentInfo.getCurrentLevel();

            Level level = language.getLevels().get(currentLevel);

            List<Step> steps = level.getSteps();

            if (indexStep  >= steps.size()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Step index out of bounds");
            }

            StepDTO stepDTO = new StepDTO();
            if (currentStep == indexStep) {
                if (currentStep + 1 >= steps.size()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This is the final step, upload the exam");
                }
                studentInfo.setCurrentStep(currentStep + 1);
                int index = studentInfos.indexOf(studentInfo);
                studentInfos.set(index, studentInfo);  // Update the existing entry
                language.setStudentInfos(studentInfos);
                languageRepository.save(language);

                stepDTO.setTitle(steps.get(currentStep + 1).getTitle());
                stepDTO.setContent(steps.get(currentStep + 1).getContent());

            } else {
                if (indexStep < currentStep) {
                    stepDTO.setTitle(steps.get(indexStep + 1).getTitle());
                    stepDTO.setContent(steps.get(indexStep + 1).getContent());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You haven't completed the previous step");
                }
            }

            return ResponseEntity.ok(stepDTO);

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


    //4 upload examSolution
    @PostMapping(value = "/{idLang}/uploadExamSolution" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> uploadExamSolution(@RequestHeader("Authorization") String token, @PathVariable("idLang") String idLang, @RequestParam MultipartFile solutionFile) {
        try {
            Student student = studentRepository.findByIdStudent(studentProxy.getEtudiant(token).getId());
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            Language language = languageRepository.findByIdLang(idLang);
            if (language == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
            }
            List<StudentInfo> studentInfos = language.getStudentInfos();

            if(studentInfos == null){
                studentInfos = new ArrayList<>();
            }

            Optional<StudentInfo> studentInfoOP = studentInfos.stream()
                    .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(student.getIdStudent()))
                    .findFirst();

            if (!studentInfoOP.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You can upload exam solution , just if you learn this laguage");
            }

            StudentInfo studentInfo = studentInfoOP.get();

            String upfile = fileSytemStorage.saveFile(solutionFile);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/admin/download/")
                    .path(upfile)
                    .toUriString();
            studentInfo.setSolutionFile(upfile);
            int index = language.getStudentInfos().indexOf(studentInfo);
            language.getStudentInfos().set(index, studentInfo); // Replace the old entry with the updated one
            languageRepository.save(language);

            return ResponseEntity.ok("Uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while uploading the exam solution: " + e.getMessage());
        }
    }


    //5 download exam of level
    @GetMapping("/{langId}/downloadExam")
    ResponseEntity<?> downloadedExam( @PathVariable("langId") String langId , @RequestHeader("Authorization") String token) {
        System.out.println("Token: " + token);
        System.out.println("Language ID: " + langId);

        Student student = studentRepository.findByIdStudent(studentProxy.getEtudiant(token).getId());
        Language language = languageRepository.findByIdLang(langId);

        if (language == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }

        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        List<StudentInfo> studentInfos = language.getStudentInfos();

        if (studentInfos == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You are not inscribed in this language ");
        }

        Optional<StudentInfo> studentInfoOp = studentInfos.stream()
                .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(studentAuth.getId()))
                .findFirst();

        if (!studentInfoOp.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
        StudentInfo studentInfo = studentInfoOp.get();
        int currentStep = studentInfo.getCurrentStep();
        int currentLevel = studentInfo.getCurrentLevel();

        Level level = language.getLevels().get(currentLevel);
        if (currentStep + 1 == level.getSteps().size()) {

            if (level.getExamFile() != null) {

                org.springframework.core.io.Resource resource = fileSytemStorage.loadFile(level.getExamFile());
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No exam found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can download the exam once you have completed all the steps !");
        }

    }


    //6  get all information about student logged
    @GetMapping("/studentInfo")
    Student getStudentLevel(@RequestHeader("Authorization") String token) {
        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        return studentRepository.findByIdStudent(studentAuth.getId());
    }

    //7 display file exam
    @GetMapping("/{langId}/displayExam")
    ResponseEntity<?> displayExam (@RequestHeader("Authorization") String token, @PathVariable("langId") String langId) {

        Student student = studentRepository.findByIdStudent(studentProxy.getEtudiant(token).getId());
        Language language = languageRepository.findByIdLang(langId);

        if (language == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }

        StudentAuth studentAuth = studentProxy.getEtudiant(token);
        List<StudentInfo> studentInfos = language.getStudentInfos();

        if (studentInfos == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You are not inscribed in this language ");
        }

        Optional<StudentInfo> studentInfoOp = studentInfos.stream()
                .filter(idStudentAndExamexist -> idStudentAndExamexist.getIdStudent().equalsIgnoreCase(studentAuth.getId()))
                .findFirst();

        if (!studentInfoOp.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
        StudentInfo studentInfo = studentInfoOp.get();
        int currentStep = studentInfo.getCurrentStep();
        int currentLevel = studentInfo.getCurrentLevel();

        Level level = language.getLevels().get(currentLevel);
        if (currentStep + 1 == level.getSteps().size()) {

            if (level.getExamFile() != null) {
                return ResponseEntity.status(HttpStatus.OK).body("http://localhost:8090/file/display/"+level.getExamFile());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No exam found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can download the exam once you have completed all the steps !");
        }

    }


}



