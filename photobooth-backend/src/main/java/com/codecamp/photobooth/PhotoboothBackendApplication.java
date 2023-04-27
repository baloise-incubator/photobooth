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
        String tessdataPath = "";
        if (resourcePath.charAt(0) == '/') {
            tessdataPath = resourcePath.substring(1);
        } else if (resourcePath.substring(0, 4).contains("file")) {
            tessdataPath = resourcePath.substring(5);
        }
        tessdataPath = tessdataPath + "tessdata";
        System.setProperty("TESSDATA_PREFIX", tessdataPath);
        log.info("tessdata: " + tessdataPath);
        Tesseract tesseract = new Tesseract();
        tesseract.setOcrEngineMode(TessAPI.TessOcrEngineMode.OEM_TESSERACT_LSTM_COMBINED);
        tesseract.setDatapath("tessdata");
        tesseract.setLanguage("deu");
        return tesseract;
    }
}
