package vttp2023.batch3.csf.assessment.cnserver.controllers;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vttp2023.batch3.csf.assessment.cnserver.models.TagCount;
import vttp2023.batch3.csf.assessment.cnserver.services.NewsService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class NewsController {

    @Autowired
    private NewsService newsSvc;

    // TODO: Task 1
    @PostMapping(path = "/news", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> upload(@RequestPart("title") String title,
                                         @RequestPart("photo") MultipartFile file,
                                         @RequestPart("description") String description,
                                         @RequestPart("tags") String tagsString) throws IOException {

        String newsId = newsSvc.postNews(title, file, description, tagsString);

        JsonObject resp = Json.createObjectBuilder()
                .add("newsId", newsId)
                .build();

        return ResponseEntity.ok(resp.toString());
    }

    // TODO: Task 2
    @GetMapping (path="/tags",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getTags(@RequestParam(defaultValue = "5") Integer time) {
        List<TagCount> tags = newsSvc.getTags(time);
        return ResponseEntity.ok(tags.toString());
    }


    // TODO: Task 3

}
