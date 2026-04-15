package com.epiis.mi_app.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageServices {
    private final String uploadDir = "uploads/categories/";
    public String saveFile(MultipartFile file)throws IOException{
        String fileName = System.currentTimeMillis() + "_"+file.getOriginalFilename();
        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        Files.copy(file.getInputStream(), path.resolve(fileName));
        return "http://localhost:8080/uploads/categories/"+ fileName;
    }
}
