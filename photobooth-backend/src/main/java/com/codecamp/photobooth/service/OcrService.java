package com.codecamp.photobooth.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.awt.image.RescaleOp;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class OcrService {

    @Autowired
    private Tesseract tesseract;

    /**
     * Initialize Tesseract, preprocess image, and executes OCR. In case of an issue Runtime is thrown.
     *
     * @param file     picture to be processed
     * @param language language of the characters
     * @return OCR string from document
     */
    public String doOcr(MultipartFile file, String language) {
        try {
            BufferedImage preProcessedImage = RGBToGrayScale(file);
            String str = tesseract.doOCR(preProcessedImage);
            return trimSpecialCharacters(str);
        } catch (Exception e) {
            throw new RuntimeException("There was an issue with OCR, please try again or take different picture");
        }
    }

    private String trimSpecialCharacters(String s) {
        s = s.replaceAll("[^a-zA-Z0-9\\s\\näÄöÖüÜßẞ.‘?|\"',\\/@]+", "");
        return s;
    }

    private BufferedImage RGBToGrayScale(MultipartFile multipartFile) throws IOException, TesseractException {
        BufferedImage ipimage = ImageIO.read(multipartFile.getInputStream());
        double d = ipimage.getRGB(ipimage.getTileWidth() / 2, ipimage.getTileHeight() / 2);

        if (d >= -1.4211511E7 && d < -7254228) {
            return processImg(ipimage, 3f, -10f);
        } else if (d >= -7254228 && d < -2171170) {
            return processImg(ipimage, 1.455f, -47f);
        } else if (d >= -2171170 && d < -1907998) {
            return processImg(ipimage, 1.35f, -10f);
        } else if (d >= -1907998 && d < -257) {
            return processImg(ipimage, 1.19f, 0.5f);
        } else if (d >= -257 && d < -1) {
            return processImg(ipimage, 1f, 0.5f);
        } else if (d >= -1 && d < 2) {
            return processImg(ipimage, 1f, 0.35f);
        }
        throw new RuntimeException("Image is out of the scale");
    }

    private BufferedImage processImg(BufferedImage ipimage, float scaleFactor, float offset) throws IOException, TesseractException {
        // Making an empty image buffer to store image later ipimage is an image buffer of input image
        BufferedImage opimage = new BufferedImage(2000, 3000, ipimage.getType());

        // creating a 2D platform on the buffer image for drawing the new image
        Graphics2D graphic = opimage.createGraphics();

        // drawing new image starting from 0 0 of size 1050 x 1024 (zoomed images)
        // null is the ImageObserver class object
        graphic.drawImage(ipimage, 0, 0, 2000, 3000, null);
        graphic.dispose();

        // rescale OP object for gray scaling images
        RescaleOp rescale = new RescaleOp(scaleFactor, offset, null);

        // performing scaling and writing on a .png file
        BufferedImage fopimage = rescale.filter(opimage, null);

        //rgb to c&w
        int width = fopimage.getWidth();
        int height = fopimage.getHeight();
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int p = fopimage.getRGB(x, y);

                int a = (p >> 24) & 0xff;
                int r = (p >> 16) & 0xff;
                int g = (p >> 8) & 0xff;
                int b = p & 0xff;

                //calculate average
                int avg = (r + g + b) / 3;

                //replace RGB value with avg
                p = (a << 24) | (avg << 16) | (avg << 8) | avg;

                fopimage.setRGB(x, y, p);
            }
        }
        ImageIO.write(fopimage, "jpg", new File("output.png"));
        return fopimage;
    }

    public List<String> transformToArray(String ocrString) {
        String trimmedString = ocrString.replaceAll("[^a-zA-Z0-9äÄöÖüÜßẞ]", " ");
        String[] words = trimmedString.split(" ");
        List<String> list = new ArrayList<>(Arrays.asList(words));
        list.removeAll(Collections.singleton(null));
        list.removeAll(Collections.singleton(""));
        return list;
    }
}
