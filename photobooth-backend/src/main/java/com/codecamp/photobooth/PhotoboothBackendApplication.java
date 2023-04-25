package com.codecamp.photobooth;

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
        Tesseract tesseract = new Tesseract();
        // Modify to absolut path until relative is working
        tesseract.setDatapath("C:\\Users\\salea\\Downloads\\tessdata");
        return tesseract;
    }
}
