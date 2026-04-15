package com.epiis.mi_app.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHash {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String hashPassword(String password) {
        return encoder.encode(password);
    }

    public static boolean checkPassword(String password, String storedHash) {
        if (password == null || storedHash == null) {
            return false;
        }
        return encoder.matches(password, storedHash);
    }

}
