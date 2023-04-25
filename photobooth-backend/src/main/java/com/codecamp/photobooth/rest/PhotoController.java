package com.codecamp.photobooth.rest;


import com.codecamp.photobooth.domain.OcrResult;
import com.codecamp.photobooth.service.OcrService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PhotoController {

    @Autowired
    private OcrService ocrService;

    @PostMapping(value = "api/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String uploadPhoto(@RequestPart("file") MultipartFile file) throws IOException, TesseractException {

        return ocrService.doOcr(file);
    }
}