package com.SurveyRestAPI.FeedBack.Security;

import org.springframework.stereotype.Service;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;


@Service
public class PasswordConfig {

    private static final Argon2 argon2 = Argon2Factory.create();

    public static String hashPassword(String plainPassword) {
        int iterations = 3;
        int memory = 65536; // 64MB
        int parallelism = 1;
        return argon2.hash(iterations, memory, parallelism, plainPassword.toCharArray());
    }
    
    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return argon2.verify(hashedPassword, plainPassword.toCharArray());
    }
}