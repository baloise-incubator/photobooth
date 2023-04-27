package com.codecamp.photobooth;

import com.codecamp.photobooth.rest.PhotoController;
import net.sourceforge.tess4j.TessAPI;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.logging.Logger;

@SpringBootApplication
public class PhotoboothBackendApplication {

    static Logger log = Logger.getLogger(PhotoController.class.getName());

    public static void main(String[] args) {
        SpringApplication.run(PhotoboothBackendApplication.class, args);
    }

    @Bean
    Tesseract getTesseract() {
        ClassLoader classLoader = getClass().getClassLoader();
        String resourcePath = classLoader.getResource("").getPath();
        if (resourcePath.charAt(0) == '/') {
            resourcePath = resourcePath.substring(1);
        }
        String tessdataPath = resourcePath + "tessdata";
        System.setProperty("TESSDATA_PREFIX", tessdataPath);
        log.info("tessdata: " + tessdataPath);
        Tesseract tesseract = new Tesseract();
        tesseract.setOcrEngineMode(TessAPI.TessOcrEngineMode.OEM_TESSERACT_LSTM_COMBINED);
        tesseract.setDatapath(tessdataPath);
        tesseract.setLanguage("deu");
        return tesseract;
    }
}
