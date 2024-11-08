package com.esisba.msarabelanguage.API;

import com.esisba.msarabelanguage.fileManagement.service.IFileSytemStorage;
import com.esisba.msarabelanguage.proxies.StudentProxy;
import com.esisba.msarabelanguage.repositories.LanguageRepository;
import com.esisba.msarabelanguage.repositories.StudentRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("file")
public class FileController {

    @Autowired
    LanguageRepository languageRepository;

    @Autowired
    IFileSytemStorage fileSytemStorage;

    @Autowired
    StudentRepository studentRepository;


    // display file
    @GetMapping("/display/{filename:.+}")
    public ResponseEntity<org.springframework.core.io.Resource> displayFile(@PathVariable String filename) {
        org.springframework.core.io.Resource resource;
        try {
            resource = fileSytemStorage.loadFile(filename);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found", e);
        }

        String contentType = "application/octet-stream";
        try {
            contentType = Files.probeContentType(resource.getFile().toPath());
        } catch (IOException ex) {
            // Could not determine file type, default to "application/octet-stream"
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }



    //download  file solution exam
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String filename) {

        org.springframework.core.io.Resource resource = fileSytemStorage.loadFile(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }




}
