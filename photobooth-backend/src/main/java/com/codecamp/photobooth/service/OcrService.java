package com.codecamp.photobooth.service;

import com.codecamp.photobooth.domain.OcrResult;
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
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class OcrService {
    @Autowired
    private Tesseract tesseract;

    public OcrResult ocr(MultipartFile file) {
        try {
            File convFile = convert(file);
            String text = tesseract.doOCR(convFile);
            OcrResult ocrResult = new OcrResult();
            ocrResult.setResult(text);
            return ocrResult;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    public String doOcr(MultipartFile file) throws IOException, TesseractException {
        return RGBToGrayScale(file);
    }

    public static File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }


    public String RGBToGrayScale(MultipartFile multipartFile) throws IOException, TesseractException {
        BufferedImage ipimage = ImageIO.read(multipartFile.getInputStream());
        double d
                = ipimage
                .getRGB(ipimage.getTileWidth() / 2,
                        ipimage.getTileHeight() / 2);


        if (d >= -1.4211511E7 && d < -7254228) {
            return processImg(ipimage, 3f, -10f);
        }
        else if (d >= -7254228 && d < -2171170) {
            return processImg(ipimage, 1.455f, -47f);
        }
        else if (d >= -2171170 && d < -1907998) {
            return processImg(ipimage, 1.35f, -10f);
        }
        else if (d >= -1907998 && d < -257) {
            return processImg(ipimage, 1.19f, 0.5f);
        }
        else if (d >= -257 && d < -1) {
            return processImg(ipimage, 1f, 0.5f);
        }
        else if (d >= -1 && d < 2) {
            return processImg(ipimage, 1f, 0.35f);
        }
        return "asdasd";
    }

    public static String processImg(BufferedImage ipimage,
               float scaleFactor,
               float offset)
            throws IOException, TesseractException
    {
        // Making an empty image buffer
        // to store image later
        // ipimage is an image buffer
        // of input image
        BufferedImage opimage
                = new BufferedImage(1050,
                1024,
                ipimage.getType());

        // creating a 2D platform
        // on the buffer image
        // for drawing the new image
        Graphics2D graphic
                = opimage.createGraphics();

        // drawing new image starting from 0 0
        // of size 1050 x 1024 (zoomed images)
        // null is the ImageObserver class object
        graphic.drawImage(ipimage, 0, 0,
                1050, 1024, null);
        graphic.dispose();

        // rescale OP object
        // for gray scaling images
        RescaleOp rescale
                = new RescaleOp(scaleFactor, offset, null);

        // performing scaling
        // and writing on a .png file
        BufferedImage fopimage
                = rescale.filter(opimage, null);
        ImageIO
                .write(fopimage,
                        "jpg",
                        new File("output.png"));

        // Instantiating the Tesseract class
        // which is used to perform OCR
        Tesseract it = new Tesseract();


        // doing OCR on the image
        // and storing result in string str
        String str = it.doOCR(fopimage);
        System.out.println(str);

        return str;
    }


}
