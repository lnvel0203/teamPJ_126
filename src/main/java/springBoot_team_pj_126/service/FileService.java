package springBoot_team_pj_126.service;


import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.FileMapper;
import springBoot_team_pj_126.dto.File;

@Service
public class FileService {

    
    private String uploadDir;

    
    @Autowired
    private FileMapper fileMapper;

    public void addFile(File file) {
        fileMapper.insert(file);
    }
    
//    
//    public void saveFile(File file) throws IOException {
//        // Save the uploaded file to the server
//    	
//    	
//        byte[] bytes = file.getData();
//        Path path = Paths.get(uploadDir + file.getName());
//        Files.write(path, bytes);
//    }

    public Resource loadFile() throws IOException {
        // Load the file from the server
    	
    	
        Path path = Paths.get(uploadDir + "file.txt");
        return new UrlResource(path.toUri());
    }
}