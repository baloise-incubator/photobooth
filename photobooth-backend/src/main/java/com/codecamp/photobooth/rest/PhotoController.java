package com.codecamp.photobooth.rest;

import com.codecamp.photobooth.service.OcrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
public class PhotoController {

    static Logger log = Logger.getLogger(PhotoController.class.getName());

    @Autowired
    private OcrService ocrService;

    @PostMapping(value = "api/validate",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<List<String>> validateFromPhoto(@RequestPart("file") MultipartFile file, @RequestParam(required = false) String lang) {
        log.info("OCR starting for validation process");
        String ocrString = ocrService.doOcr(file, lang);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<>(ocrService.transformToArray(ocrString), headers, HttpStatus.OK);
    }

    @PostMapping(value = "api/populate",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> populateFromPhoto(@RequestPart("file") MultipartFile file, @RequestParam(required = false) String lang) {
        log.info("OCR starting for form population process");
        return new ResponseEntity<>(ocrService.doOcr(file, lang), HttpStatus.OK);
    }
}