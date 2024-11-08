package com.esisba.msarabelanguage.fileManagement;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadProperties {
        private String location;
}
