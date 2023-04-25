package com.codecamp.photobooth;

import net.sourceforge.tess4j.Tesseract;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.net.URL;

@SpringBootApplication
public class PhotoboothBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhotoboothBackendApplication.class, args);
	}

	@Bean
	Tesseract getTesseract() {
		Tesseract tesseract = new Tesseract();
		tesseract.setDatapath("../tessdata");
		return tesseract;
	}
}
