package pf.socredo.socmarket.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "rH6Ho6rur8kXdy+R99SqG7ff/uGu5frrre/O5uCQFc4="; // Remplace par une vraie clé sécurisée
    private static final long EXPIRATION_TIME = 86400000; // 1 jour

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String login) {
        return Jwts.builder()
                .subject(login)  // ✅ Remplace `setSubject()` (déprécié)
                .issuedAt(new Date())  // ✅ Remplace `setIssuedAt()`
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // ✅ Remplace `setExpiration()`
                .signWith(getSigningKey(), Jwts.SIG.HS256)  // ✅ Utilisation correcte de signWith()
                .compact();
    }

    public String extractLogin(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())  // ✅ Utilisation correcte de verifyWith()
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSigningKey())  // ✅ Vérification correcte du token
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
