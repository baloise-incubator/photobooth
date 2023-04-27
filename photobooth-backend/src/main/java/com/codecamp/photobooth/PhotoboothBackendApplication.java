package com.codecamp.photobooth;

import net.sourceforge.tess4j.TessAPI;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PhotoboothBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhotoboothBackendApplication.class, args);
    }

    @Bean
    Tesseract getTesseract() {
        ClassLoader classLoader = getClass().getClassLoader();
        String tessdataPath = classLoader.getResource("").getPath().substring(1) + "tessdata";
        System.setProperty("TESSDATA_PREFIX", tessdataPath);
        Tesseract tesseract = new Tesseract();
        tesseract.setOcrEngineMode(TessAPI.TessOcrEngineMode.OEM_TESSERACT_LSTM_COMBINED);
        tesseract.setDatapath(tessdataPath);
        tesseract.setLanguage("deu");
        return tesseract;
    }
}
