package com.esisba.msarabelanguage.fileManagement.service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
//import com.esisba.msarabelanguage.fileManagement.exception.FileNotFoundException;
//import com.esisba.msarabelanguage.fileManagement.exception.FileStorageException;

import com.esisba.msarabelanguage.fileManagement.FileUploadProperties;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileSystemStorageService implements IFileSytemStorage {

    private final Path dirLocation;

    @Autowired
    public FileSystemStorageService(FileUploadProperties fileUploadProperties) {
        this.dirLocation = Paths.get(fileUploadProperties.getLocation())
                .toAbsolutePath()
                .normalize();
    }

    @Override
    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.dirLocation);
        }
        catch (Exception ex) {
            throw new RuntimeException("Could not create upload directory!", ex);
        }
    }

    @Override
    public String saveFile(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String uniqueFilename = System.currentTimeMillis() + "_" + fileName;
            Path dfile = this.dirLocation.resolve(uniqueFilename);

            Files.copy(file.getInputStream(), dfile,StandardCopyOption.REPLACE_EXISTING);
            return uniqueFilename ;

        } catch (Exception e) {
            throw new RuntimeException("Could not upload file", e);
        }
    }

    @Override
    public Resource loadFile(String fileName) {
        try {
            Path file = this.dirLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new RuntimeException("Could not find file");
            }
        }
        catch (MalformedURLException e) {
            throw new RuntimeException("Could not download file", e);
        }
    }
}